import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
  UsePipes
} from "@nestjs/common"
import { FileInterceptor } from "@nestjs/platform-express"
import { ApiBody, ApiCreatedResponse, ApiTags } from "@nestjs/swagger"
import { unlink } from "fs"
import { diskStorage } from "multer"
import { extname } from "path"
import { CustomValidationPipe } from "src/common/common.pipe"
import { FileCreateDto } from "./dto/fileCreate.dto"
import { MessageCreateDto } from "./dto/messageCreate.dto"
import { ResThreadDto } from "./dto/resThread.dto"
import { ThreadCreateDto } from "./dto/threadCreate.dto"
import { ThreadRequestCreateDto } from "./dto/threadRequestCreate.dto"
import { ThreadService } from "./thread.service"

@ApiTags("threads")
@Controller("threads")
export class ThreadController {
  constructor(private readonly threadService: ThreadService) {}

  @Post()
  @ApiBody({ type: ThreadRequestCreateDto })
  @ApiCreatedResponse({ type: ResThreadDto })
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./uploads",
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9)
          const ext = extname(file.originalname)
          const filename = `${uniqueSuffix}${ext}`
          callback(null, filename)
        }
      })
    })
  )
  async createThread(
    @Body("thread") threadCreateDto: ThreadCreateDto,
    @Body("message") messageCreateDto?: MessageCreateDto,
    @UploadedFile() file?: Express.Multer.File,
    @Body("senderId") senderId?: string,
    @Body("receiveId") receiveId?: string,
    @Body("channelId") channelId?: string,
    @Body("chatId") chatId?: string
  ): Promise<ResThreadDto> {
    const fileUpload: FileCreateDto = {
      ...file,
      path: file.path.replace(/\\/g, "/")
    }
    const rs = await this.threadService.createThread(
      threadCreateDto,
      messageCreateDto,
      fileUpload,
      senderId,
      receiveId,
      channelId,
      chatId
    )
    const flag = true
    if (flag) {
      if (file && file.path) {
        unlink(file.path, (err) => {
          if (err) {
            console.error(`Error deleting file: ${file.path}`)
            console.error(err)
          } else {
            console.log(`File deleted: ${file.path}`)
          }
        })
      }
    }
    return {
      success: rs.thread.success,
      message: rs.thread.message,
      errors: rs.thread.errors,
      data: rs.thread.data
    }
  }
  @Post("reply")
  @ApiBody({ type: ThreadRequestCreateDto })
  @ApiCreatedResponse({ type: ResThreadDto })
  @UsePipes(new CustomValidationPipe())
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./uploads",
        filename: (_, file, callback) => {
          const uniqueSuffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9)
          const ext = extname(file.originalname)
          const filename = `${uniqueSuffix}${ext}`
          callback(null, filename)
        }
      })
    })
  )
  async createReplyThread(
    @Body("threadId") threadId: string,
    @Body("message") messageCreateDto?: MessageCreateDto,
    @UploadedFile() file?: Express.Multer.File
  ): Promise<ResThreadDto> {
    const fileUpload: FileCreateDto = { ...file }

    const rs = await this.threadService.createReplyThread(
      threadId,
      messageCreateDto,
      fileUpload
    )
    if (!rs.thread.success) {
      if (file && file.path) {
        unlink(file.path, (err) => {
          if (err) {
            console.error(`Error deleting file: ${file.path}`)
            console.error(err)
          } else {
            console.log(`File deleted: ${file.path}`)
          }
        })
      }
    }

    return {
      success: rs.threadReply.success,
      message: rs.threadReply.message,
      errors: rs.threadReply.errors,
      data: rs.threadReply.data
    }
  }

  @Post("react")
  @ApiBody({ type: ThreadRequestCreateDto })
  @ApiCreatedResponse({ type: ResThreadDto })
  @UsePipes(new CustomValidationPipe())
  async addReact(
    @Body("react") reactToDb: any,
    @Body("threadId") threadId: string,
    @Body("userId") userId: string
  ): Promise<ResThreadDto> {
    const rs = await this.threadService.addReact(reactToDb, threadId, userId)
    return {
      success: rs.thread.success,
      message: rs.thread.message,
      errors: rs.thread.errors,
      data: null
    }
  }

  @Post("unreact")
  @ApiBody({ type: ThreadRequestCreateDto })
  @ApiCreatedResponse({ type: ResThreadDto })
  @UsePipes(new CustomValidationPipe())
  async removeReact(
    @Body("threadId") threadId: string,
    @Body("userId") userId: string
  ): Promise<ResThreadDto> {
    const rs = await this.threadService.removeReact(threadId, userId)
    return {
      success: rs.thread.success,
      message: rs.thread.message,
      errors: rs.thread.errors,
      data: null
    }
  }

  @Patch(":threadId")
  @ApiBody({ type: ThreadRequestCreateDto })
  @ApiCreatedResponse({ type: ResThreadDto })
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./uploads",
        filename: (_, file, callback) => {
          const uniqueSuffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9)
          const ext = extname(file.originalname)
          const filename = `${uniqueSuffix}${ext}`
          callback(null, filename)
        }
      })
    })
  )
  async updateThread(
    @Param("threadId") threadId: string,
    @Body("thread") threadCreateDto: ThreadCreateDto,
    @Body("message") messageCreateDto?: MessageCreateDto,
    @UploadedFile() file?: Express.Multer.File,
    @Body("senderId") senderId?: string,
    @Body("receiveId") receiveId?: string,
    @Body("channelId") channelId?: string,
    @Body("chatId") chatId?: string
  ): Promise<ResThreadDto> {
    const fileUpload: FileCreateDto = { ...file }
    const rs = await this.threadService.updateThread(
      threadId,
      threadCreateDto,
      messageCreateDto,
      fileUpload,
      senderId,
      receiveId,
      channelId,
      chatId
    )
    if (!rs.thread.success) {
      if (file && file.path) {
        unlink(file.path, (err) => {
          if (err) {
            console.error(`Error deleting file: ${file.path}`)
            console.error(err)
          } else {
            console.log(`File deleted: ${file.path}`)
          }
        })
      }
    }
    return {
      success: rs.thread.success,

      message: rs.thread.message,
      errors: rs.thread.errors,
      data: null
    }
  }

  @Delete(":threadId")
  async deleteThread(
    @Param("threadId") threadId: string
  ): Promise<ResThreadDto> {
    const rs = await this.threadService.deleteThread(threadId)
    return {
      success: rs.thread.success,
      message: rs.thread.message,
      errors: rs.thread.errors,
      data: null
    }
  }

  @Get()
  async getAllThread(@Query() raw: any) {
    const map = new Map<string, string>(Object.entries(raw))
    let firstKey: string
    let secondKey: string

    for (const [key] of map) {
      if (!firstKey) firstKey = key
      else if (!secondKey) secondKey = key
    }

    if (firstKey === "text") {
      const data = await this.threadService.findByText(map.get("text"))
      return {
        success: true,
        message: "Get thread success",
        errors: "",
        data
      }
    } else if (firstKey === "from") {
      const rs = await this.threadService.findByDate(
        map.get("from"),
        map.get("to")
      )

      return {
        success: true,
        message: "Get thread success",
        errors: "",
        data: rs
      }
    } else {
      const rs = await this.threadService.getAllThread()
      return {
        success: true,
        message: "Get thread success",
        errors: "",
        data: rs
      }
    }
  }

  @Get(":threadId")
  async getThreadById(@Param("threadId") threadId: string) {
    const rs = await this.threadService.getThreadById(threadId)
    const newFiles = rs.files.map((file) => {
      return {
        ...file,
        path: `${process.env.HOST}:${process.env.APP_PORT}/api/${file.path}`
      }
    })
    return {
      ...rs,
      files: newFiles
    }
  }
}
