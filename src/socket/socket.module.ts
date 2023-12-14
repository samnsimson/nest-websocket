import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [CacheModule.register()],
  providers: [SocketGateway],
})
export class SocketModule {}
