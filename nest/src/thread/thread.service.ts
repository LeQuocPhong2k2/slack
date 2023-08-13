import { Injectable } from "@nestjs/common"
import { AuthService } from "src/auth/auth.service"
import { CommonService } from "src/common/common.service"
import { ThreadRepository } from "./thread.repository"
import { ThreadCreateDto } from "./dto/threadCreate.dto"
import { MessageCreateDto } from "./dto/messageCreate.dto"
import { ThreadToDBDto } from "./dto/relateDB/threadToDB.dto"
import { FileCreateDto } from "./dto/fileCreate.dto"
import { ReactCreateDto } from "./dto/reactCreate.dto"

@Injectable()
export class ThreadService {
  constructor(
    private authService: AuthService,
    private commonService: CommonService,
    private threadRepository: ThreadRepository
  ) {}

  async createThread(
    threadCreateDto: ThreadCreateDto,
    messageCreateDto?: MessageCreateDto,
    fileCreateDto?: FileCreateDto,
    senderId?: string,
    receiveId?: string,
    channelId?: string,
    chatId?: string
  ) {
    const threadToDb = this.compareToCreateThread(
      threadCreateDto,
      messageCreateDto,
      fileCreateDto,
      senderId,
      receiveId,
      channelId,
      chatId
    )

    const limitFileSize = this.limitFileSize(fileCreateDto.size)

    if (!limitFileSize) {
      return {
        success: false,
        message: "File size is too large",
        errors: "File size is too large",
        thread: null
      }
    }

    const thread = await this.threadRepository.createThread(threadToDb)

    return {
      thread
    }
  }

  async updateThread(
    threadId: string,
    threadCreateDto: ThreadCreateDto,
    messageCreateDto?: MessageCreateDto,
    fileCreateDto?: FileCreateDto,
    senderId?: string,
    receiveId?: string,
    channelId?: string,
    chatId?: string
  ) {
    const threadToDb = this.compareToCreateThread(
      threadCreateDto,
      messageCreateDto,
      fileCreateDto,
      senderId,
      receiveId,
      channelId,
      chatId,
      threadId
    )

    const thread = await this.threadRepository.updateThread(threadToDb)
    const limitFileSize = this.limitFileSize(fileCreateDto.size)

    if (!limitFileSize) {
      return {
        success: false,
        message: "File size is too large",
        errors: "File size is too large",
        thread: null
      }
    }
    return {
      thread
    }
  }

  async deleteThread(threadId: string) {
    const thread = await this.threadRepository.deleteThread(threadId)
    return {
      thread
    }
  }

  async createReplyThread(
    threadId: string,
    messageCreateDto?: MessageCreateDto,
    fileCreateDto?: FileCreateDto
  ) {
    const thread = this.compareToCreateThread(
      null,
      messageCreateDto,
      fileCreateDto,
      threadId
    )

    const threadReply = await this.threadRepository.createReplyThread(thread)

    const limitFileSize = this.limitFileSize(fileCreateDto.size)

    if (!limitFileSize) {
      return {
        success: false,
        message: "File size is too large",
        errors: "File size is too large",
        thread: null
      }
    }
    return {
      success: true,
      message: "Create reply thread success",
      errors: null,
      threadReply
    }
  }

  async addReact(react: ReactCreateDto, threadId: string, userId: string) {
    const reactToDb = this.compareToCreateReact(react, threadId, userId)
    const thread = await this.threadRepository.addReact(reactToDb)
    return {
      thread
    }
  }

  async removeReact(threadId: string, userId: string) {
    const reactToDb = this.compareToCreateReact(null, threadId, userId)
    const thread = await this.threadRepository.removeReact(reactToDb)
    return {
      thread
    }
  }

  async getAllThread() {
    const threads = await this.threadRepository.getAllThread()
    const newThreads = threads.map((item) => {
      return {
        ...item,
        files: item.files.map((file) => {
          return {
            ...file,
            size: this.convertToMB(file.size)
          }
        })
      }
    })
    return newThreads
  }

  async getThreadById(threadId: string) {
    const thread = await this.threadRepository.getThreadById(threadId)
    return thread
  }

  async getThreadByReceiveId(receiveId: string) {
    const thread = await this.threadRepository.getThreadByReceiveId(receiveId)
    return thread
  }

  async findByText(text: string) {
    const findByText = await this.threadRepository.findByText(text)
    //convert to array
    const data = findByText.map((item) => {
      return {
        ...item
      }
    })
    return data
  }

  async findByDate(from: string, to?: string) {
    const threads = await this.threadRepository.findByDate(from, to)
    return threads
  }

  private compareToCreateThread(
    threadCreateDto?: ThreadCreateDto,
    messageCreateDto?: MessageCreateDto,
    fileCreateDto?: FileCreateDto,
    senderId?: string,
    receiveId?: string,
    channelId?: string,
    chatId?: string,
    threadId?: string
  ): ThreadToDBDto {
    return {
      ...threadCreateDto,
      message: {
        ...messageCreateDto
      },
      file: {
        ...fileCreateDto
      },
      senderId,
      receiveId,
      channelId,
      chatId,
      threadId
    }
  }

  private compareToCreateReact(
    reactCreateDto?: ReactCreateDto,
    threadId?: string,
    userId?: string
  ) {
    return {
      ...reactCreateDto,
      threadId,
      userId
    }
  }

  private convertDateToDB(date: string) {
    const convert = new Date(date)
    const year = convert.getFullYear()
    const month =
      convert.getMonth() + 1 < 10
        ? `0${convert.getMonth() + 1}`
        : convert.getMonth() + 1

    const day = convert.getDate()

    const formattedDate = `${year}-${month}-${day}`
    return formattedDate
  }

  private convertToMB = (bytes: number) => {
    const mb = bytes / 1024 / 1024
    return mb.toFixed(2)
  }

  private limitFileSize = (bytes: number) => {
    const fileSize = bytes / 1024 / 1024 // MB
    if (fileSize > 10) {
      return false
    }
    return true
  }
}
