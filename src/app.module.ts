import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocketModule } from './socket/socket.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [SocketModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
