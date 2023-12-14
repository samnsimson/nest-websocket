import { Inject, OnModuleInit, UseInterceptors } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageObjectDto } from './dto/message.dto';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager';

@WebSocketGateway({ cors: { origin: '*' } })
export class SocketGateway implements OnModuleInit {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', async (socket) => {
      const { client } = socket.handshake.query;
      if (!client) return;
      await this.setCache(String(client), socket.id);
    });
  }

  setCache = async (key: string, value: string) => {
    await this.cacheManager.set(`client-${key}`, value, 10 * 6000);
  };

  @UseInterceptors(CacheInterceptor)
  @SubscribeMessage('message')
  async handleMessage(client: Socket, data: MessageObjectDto): Promise<MessageObjectDto> {
    const { to } = data;
    if (!to) return;
    this.cacheManager.get(`client-${to}`).then((c: string) => {
      console.log('C', c);
      if (!c) return client.emit('offline', { to });
      this.server.to(c).emit('message', { ...data, receivedOn: new Date() });
    });
    return data;
  }
}
