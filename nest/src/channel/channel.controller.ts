/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post } from "@nestjs/common"
import { ApiTags, ApiBody, ApiCreatedResponse } from "@nestjs/swagger"
import { ChannelService } from "./channel.service"
import { ChannelResquestCreateDto } from "./dto/channelResquestCreate.dto"
import { ResChannelDto } from "./dto/resChannel.dto"
import { ChannelCreateDto } from "./dto/ChannelCreate.dto"
import { ChannelUpdateDto } from "./dto/ChannelUpdate.dto"

@ApiTags("channels")
@Controller("channels")
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Get()
  async getAllChannel() {
    return await this.channelService.getAllChannel()
  }
  @Get(":channelId")
  async getChannelById(@Param("channelId") channelId: string) {
    return await this.channelService.getChannelById(channelId)
  }

  @Post()
  @ApiBody({ type: ChannelResquestCreateDto })
  @ApiCreatedResponse({ type: ResChannelDto })
  async createChannel(@Body("channel") channel: ChannelCreateDto) {
    return await this.channelService.createChannel(channel)
  }

  @Post()
  @ApiBody({ type: ChannelResquestCreateDto })
  @ApiCreatedResponse({ type: ResChannelDto })
  async updateChannel(
    @Body("channelId") channelId: string,
    @Body("channelUpdate") channelUpdate: ChannelUpdateDto
  ) {
    return await this.channelService.updateChannel(channelId, channelUpdate)
  }

  @Post()
  @ApiCreatedResponse({ type: ResChannelDto })
  async deleteChannel(@Body("channelId") channelId: string) {
    return await this.channelService.deleteChannel(channelId)
  }

  @Post()
  @ApiCreatedResponse({ type: ResChannelDto })
  async addUserToChannel(
    @Body("channelId") channelId: string,
    @Body("userId") userId: string
  ) {
    return await this.channelService.addUserToChannel(channelId, userId)
  }
}
