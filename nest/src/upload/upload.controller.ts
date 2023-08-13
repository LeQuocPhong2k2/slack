/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Res } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { Response } from "express"

@ApiTags("uploads")
@Controller("uploads")
export class UploadController {
  @Get(":filename")
  async serveFile(
    @Param("filename") filename: string,
    @Res() res: Response
  ): Promise<void> {
    res.sendFile(filename, { root: "./uploads" })
  }
}
