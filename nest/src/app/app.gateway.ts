import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { MessageCreateDto } from 'src/thread/dto/messageCreate.dto';
import { ThreadCreateDto } from 'src/thread/dto/threadCreate.dto';
import { ThreadService } from 'src/thread/thread.service';
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private threadService: ThreadService) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('sendMessage')
  async handleSendMessage(client: Socket, payload: any): Promise<void> {
    const {
      threadCreateDto,
      messageCreateDto,
    }: {
      threadCreateDto: ThreadCreateDto;
      messageCreateDto: MessageCreateDto;
    } = payload;
    await this.threadService.createThread(threadCreateDto, messageCreateDto);
    this.server.emit('sentMessage', payload);
  }

  afterInit(server: Server) {
    //Do stuffs
  }

  handleDisconnect(client: Socket) {
    console.log(`Disconnected: ${client.id}`);
    //Do stuffs
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Connected ${client.id}`);
    //Do stuffs
  }
}
