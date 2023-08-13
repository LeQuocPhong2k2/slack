import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { CommonService } from 'src/common/common.service';
import { UserCheck } from 'src/user/user.check';
import { ChatRepository } from './chat.repository';
import { ChatCreateDto } from './dto/ChatCreate.dto';
import { ChatToDBDto } from './dto/relateDB/ChatToDB.dto';

@Injectable()
export class ChatService {
  constructor(
    private authService: AuthService,
    private commonService: CommonService,
    private chatRepository: ChatRepository,
    private userCheck: UserCheck,
  ) {}

  async getAllChat() {
    const chats = await this.chatRepository.getAllChat();
    return chats;
  }

  async getChatById(chatId: string) {
    const chat = await this.chatRepository.getChatById(chatId);
    return chat;
  }

  async createChat(
    chatCreateDto: ChatCreateDto,
    senderId: string,
    receiveId: string,
  ) {
    const chatToDb = this.compareToCreateChat(
      chatCreateDto,
      senderId,
      receiveId,
    );

    const chat = await this.chatRepository.createChat(chatToDb);
    return chat;
  }

  private compareToCreateChat(
    chatCreateDto: ChatCreateDto,
    senderId: string,
    receiveId: string,
  ): ChatToDBDto {
    return {
      ...chatCreateDto,
      senderId,
      receiveId,
    };
  }
}
