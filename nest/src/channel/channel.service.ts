/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common"
import { AuthService } from "src/auth/auth.service"
import { CommonService } from "src/common/common.service"
import { UserCheck } from "src/user/user.check"
import { ChannelRepository } from "./channel.repository"
import { ChannelCreateDto } from "./dto/ChannelCreate.dto"
import { ChannelUpdateDto } from "./dto/ChannelUpdate.dto"

@Injectable()
export class ChannelService {
  constructor(
    private authService: AuthService,
    private commonService: CommonService,
    private channelRepository: ChannelRepository,
    private userCheck: UserCheck
  ) {}

  async getAllChannel() {
    const channels = await this.channelRepository.getAllChannel()
    return channels
  }

  async getChannelById(channelId: string) {
    return await this.channelRepository.getChannelById(channelId)
  }

  async createChannel(channelCreateDto: ChannelCreateDto) {
    return this.channelRepository.createChannel(channelCreateDto)
  }

  async updateChannel(channelId: string, channelUpdateDto: ChannelUpdateDto) {
    return this.channelRepository.updateChannel(channelId, channelUpdateDto)
  }

  async deleteChannel(channelId: string) {
    return this.channelRepository.deleteChannel(channelId)
  }

  async addUserToChannel(channelId: string, userId: string) {
    return this.channelRepository.addUserToChannel(channelId, userId)
  }
}
