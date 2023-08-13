/* eslint-disable prettier/prettier */
import { Tx } from "src/common/common.type"
import { PrismaService } from "src/prisma/prisma.service"
import { ChannelCreateDto } from "./dto/ChannelCreate.dto"
import { ChannelUpdateDto } from "./dto/ChannelUpdate.dto"
import { Injectable } from "@nestjs/common"

@Injectable()
export class ChannelRepository {
  constructor(private prisma: PrismaService) {}

  async getAllChannel(prisma: Tx = this.prisma) {
    const channels = await prisma.channels.findMany()

    const getAllUserOfChannel = async (channelId: string) => {
      const users = await prisma.channels.findUnique({
        where: {
          id: channelId
        },
        include: {
          users: true
        }
      })
      return users
    }

    const final = await Promise.all(
      channels.map(async (channel) => {
        const channels = await getAllUserOfChannel(channel.id)
        const users = channels?.users
        return {
          ...channel,
          users
        }
      })
    )
    return final
  }

  async getChannelById(id: string, prisma: Tx = this.prisma) {
    const channel = await prisma.channels.findUnique({
      where: {
        id: id
      },
      include: {
        thread: true
      }
    })

    const getAllMessageOfThread = async (threadId: string) => {
      const thread = await prisma.threads.findUnique({
        where: {
          id: threadId
        },
        include: {
          messages: true
        }
      })
      return thread
    }

    const getAllFileOfThread = async (threadId: string) => {
      const thread = await prisma.threads.findUnique({
        where: {
          id: threadId
        },
        include: {
          files: true
        }
      })
      return thread
    }

    const threads = channel.thread

    const newThread = await Promise.all(
      threads.map(async (thread) => {
        const threads = await getAllMessageOfThread(thread.id)
        const messages = threads?.messages
        const files = await getAllFileOfThread(thread.id)
        const filesThread = files?.files
        return {
          ...thread,
          messages,
          files: filesThread
        }
      })
    )

    return {
      ...channel,
      thread: newThread
    }
  }

  async createChannel(
    ChannelCreateDto: ChannelCreateDto,
    prisma: Tx = this.prisma
  ) {
    await prisma.channels.create({
      data: {
        name: ChannelCreateDto.name,
        isPublic: ChannelCreateDto.status
      }
    })

    return {
      success: true,
      message: "Create channel successfully",
      errors: ""
    }
  }

  async updateChannel(
    id: string,
    channelUpdateDto: ChannelUpdateDto,
    prisma: Tx = this.prisma
  ) {
    await prisma.channels.update({
      where: {
        id: id
      },
      data: {
        ...channelUpdateDto
      }
    })

    return {
      success: true,
      message: "Update channel successfully",
      errors: ""
    }
  }

  async deleteChannel(id: string, prisma: Tx = this.prisma) {
    await prisma.channels.delete({
      where: {
        id: id
      }
    })

    return {
      success: true,
      message: "Delete channel successfully",
      errors: ""
    }
  }

  async addUserToChannel(
    channelId: string,
    userId: string,
    prisma: Tx = this.prisma
  ) {
    await prisma.channels.update({
      where: {
        id: channelId
      },
      data: {
        userId: {
          push: userId
        }
      }
    })
    return {
      success: true,
      message: "Add user to channel successfully",
      errors: ""
    }
  }
}
