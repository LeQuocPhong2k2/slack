import { Injectable } from "@nestjs/common"
import { Res, Tx } from "src/common/common.type"
import { PrismaService } from "src/prisma/prisma.service"
import { ThreadToDBDto } from "./dto/relateDB/threadToDB.dto"
import { ReactCreateDto } from "./dto/reactCreate.dto"
import { ReactToDBDto } from "./dto/relateDB/reactToDB.dto"

@Injectable()
export class ThreadRepository {
  constructor(private prisma: PrismaService) {}

  async createThread(
    threadToDB: ThreadToDBDto,
    prisma: Tx = this.prisma
  ): Promise<Res> {
    const message = threadToDB.message
    let threadId = ""
    let newThread: any
    let newMsg: any
    let newFile: any
    if (threadToDB.chatId === undefined || threadToDB.receiveId === null) {
      newThread = await prisma.threads.create({
        data: {
          senderId: threadToDB.senderId,
          channelId: threadToDB.channelId
        },
        include: {
          user: true,
          messages: true
        }
      })
      threadId = newThread.id
    } else {
      newThread = await prisma.threads.create({
        data: {
          receiveId: threadToDB.receiveId,
          chats: {
            connect: {
              id: threadToDB.chatId
            }
          }
        },
        include: {
          user: true,
          messages: true
        }
      })
      threadId = newThread.id
    }

    const user = await prisma.users.findMany({
      where: {
        OR: [{ id: threadToDB.senderId }, { id: threadToDB.receiveId }]
      }
    })

    if (threadToDB.message.message !== undefined) {
      newMsg = await prisma.messages.create({
        data: {
          threadId,
          message: message.message
        }
      })
    } else if (threadToDB.file !== undefined) {
      newFile = await prisma.files.create({
        data: {
          ...threadToDB.file,
          threadId
        }
      })

      if (!newFile) {
        return {
          success: false,
          message: "Create thread failed",
          errors: "Create file failed",
          data: null
        }
      }
    }

    return {
      success: true,
      message: "Create thread successfully",
      errors: "",
      data: {
        ...newThread,
        user: {
          ...user
        },
        messages: {
          ...newMsg
        },
        files: {
          ...newFile
        }
      }
    }
  }

  async createReplyThread(
    threadToDB: ThreadToDBDto,
    prisma: Tx = this.prisma
  ): Promise<Res> {
    const message = threadToDB.message
    const threadId = threadToDB.threadId
    let newMsg: any
    let newFile: any
    if (threadToDB.message.message !== undefined) {
      newMsg = await prisma.messages.create({
        data: {
          threadId,
          message: message.message
        }
      })
    } else if (threadToDB.file !== undefined) {
      newFile = await prisma.files.create({
        data: {
          ...threadToDB.file,
          threadId
        }
      })

      if (!newFile) {
        return {
          success: false,
          message: "Create thread failed",
          errors: "Create file failed",
          data: null
        }
      }
    }
    // const thread = await prisma.threads.findUnique({
    //   where: {
    //     id: threadId,
    //   },
    //   include: {
    //     messages: true,
    //     user: true,
    //   },
    // });

    // const user = await prisma.users.findMany({
    //   where: {
    //     OR: [{ id: threadToDB.senderId }, { id: threadToDB.receiveId }],
    //   },
    // });

    return {
      success: true,
      message: "Create thread successfully",
      errors: "",
      data: {
        messages: {
          ...newMsg
        },
        files: {
          ...newFile
        }
      }
    }
  }

  async updateThread(threadToDB: ThreadToDBDto, prisma: Tx = this.prisma) {
    const threadId = threadToDB.threadId
    const message = threadToDB.message

    const updateMsg = await prisma.messages.update({
      where: {
        threadId: threadId
      },
      data: {
        message: message.message
      }
    })

    const updateFile = await prisma.files.update({
      where: {
        threadId: threadId
      },
      data: {
        ...threadToDB.file
      }
    })

    if (!updateMsg && !updateFile) {
      return {
        success: false,
        message: "Update thread failed",
        errors: "Update message and file failed",
        data: null
      }
    }

    if (updateFile || updateMsg) {
      await prisma.threads.update({
        where: {
          id: threadId
        },
        data: {
          isEdited: true
        }
      })
    }

    return {
      success: true,
      message: "Update thread successfully",
      errors: "",
      data: {
        messages: {
          ...updateMsg
        },
        files: {
          ...updateFile
        }
      }
    }
  }

  async deleteThread(threadId: string, prisma: Tx = this.prisma) {
    const deleteMsg = await prisma.messages.deleteMany({
      where: {
        threadId: threadId
      }
    })

    const deleteFile = await prisma.files.deleteMany({
      where: {
        threadId: threadId
      }
    })

    const deleteReact = await prisma.reactions.deleteMany({
      where: {
        threadId: threadId
      }
    })

    const deleteThread = await prisma.threads.delete({
      where: {
        id: threadId
      }
    })

    if (!deleteMsg && !deleteFile && !deleteReact && !deleteThread) {
      return {
        success: false,
        message: "Delete thread failed",
        errors: "Delete message, file, react and thread failed",
        data: null
      }
    }

    return {
      success: true,
      message: "Delete thread successfully",
      errors: "",
      data: null
    }
  }

  async addReact(reactToDB: ReactToDBDto, prisma: Tx = this.prisma) {
    const threadId = reactToDB.threadId
    const userId = reactToDB.userId

    await prisma.reactions.create({
      data: {
        threadId: threadId,
        userId: userId,
        reaction: reactToDB.react
      }
    })

    return {
      success: true,
      message: "Create react successfully",
      errors: ""
    }
  }

  async removeReact(reactToDB: ReactToDBDto, prisma: Tx = this.prisma) {
    const threadId = reactToDB.threadId
    const userId = reactToDB.userId

    await prisma.reactions.delete({
      where: {
        userId: userId,
        threadId: threadId
      }
    })

    return {
      success: true,
      message: "Delete react successfully",
      errors: ""
    }
  }

  async getAllThread(prisma: Tx = this.prisma) {
    const threads = await prisma.threads.findMany({
      include: {
        messages: true,
        user: true,
        files: true,
        reactions: true
      }
    })

    return threads
  }

  async getThreadByReceiveId(receiveId: string, prisma: Tx = this.prisma) {
    const threads = await prisma.threads.findMany({
      where: {
        receiveId: receiveId
      },
      include: {
        messages: true,
        user: true
      }
    })

    return threads
  }

  async getThreadById(threadId: string, prisma: Tx = this.prisma) {
    const thread = await prisma.threads.findUnique({
      where: {
        id: threadId
      },
      include: {
        messages: true,
        user: true,
        files: true
      }
    })

    return thread
  }

  async findByText(text: string, prisma: Tx = this.prisma) {
    const threads = await prisma.threads.findMany({
      where: {
        messages: {
          some: {
            message: {
              contains: text
            }
          }
        }
      },
      include: {
        messages: true,
        user: true
      }
    })

    return threads
  }

  async findByDate(from: string, to?: string, prisma: Tx = this.prisma) {
    const threads = await prisma.threads.findMany({
      where: {
        messages: {
          some: {
            createdAt: {
              gte: `${from}T00:00:00.000+00:00`,
              lte:
                to === undefined
                  ? `${from}T23:59:59.000+00:00`
                  : `${to}T23:59:59.000+00:00`
            }
          }
        }
      },
      include: {
        messages: true,
        user: true
      }
    })

    return threads
  }
}
