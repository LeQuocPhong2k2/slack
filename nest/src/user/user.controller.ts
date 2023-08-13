/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  UsePipes,
  Headers,
  Body,
  UseGuards,
  Get,
  Put,
  UseInterceptors,
  UploadedFile,
  Param
} from "@nestjs/common"
import {
  ApiTags,
  ApiBody,
  ApiCreatedResponse,
  ApiHeader
} from "@nestjs/swagger"
import { AuthGuard } from "src/auth/guard/auth.guard"
import { Token } from "src/auth/iterface/auth.interface"
import { CustomValidationPipe } from "src/common/common.pipe"
import { UserCreateDto } from "./dto/userCreate.dto"
import { UserLoginDto } from "./dto/userLogin.dto"
import { UserUpdateDto } from "./dto/userUpdate.dto"
import { ResUserDto } from "./dto/resUser.dto"
import { UserService } from "./user.service"
import { UserRequestCreateDto } from "./dto/userRequestCreate.dto"
import { UserRequestLoginDto } from "./dto/userRequestLogin.dto"
import { UserRequestUpdateDto } from "./dto/userRequestUpdate.dto"
import { FileInterceptor } from "@nestjs/platform-express"
import { diskStorage } from "multer"
import { extname } from "path"
import { FileCreateDto } from "src/thread/dto/fileCreate.dto"

@ApiTags("users")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("register")
  @ApiBody({ type: UserRequestCreateDto })
  @ApiCreatedResponse({ type: ResUserDto })
  @UsePipes(new CustomValidationPipe())
  @UseInterceptors(
    FileInterceptor("avatar", {
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
  async createUsers(
    @Body() userCreateDto: UserCreateDto,
    @UploadedFile() file?: Express.Multer.File
  ): Promise<ResUserDto> {
    const fileUpload: FileCreateDto = {
      ...file,
      path: file.path.replace("\\", "/")
    }
    return await this.userService.createUser({
      ...userCreateDto,
      avatar: fileUpload.path
    })
  }

  @Post("login")
  @ApiBody({ type: UserRequestLoginDto })
  @ApiCreatedResponse({ type: ResUserDto })
  @UsePipes(new CustomValidationPipe())
  async login(@Body() userLoginDto: UserLoginDto): Promise<ResUserDto> {
    const user = await this.userService.login(userLoginDto)
    return {
      success: true,
      message: "Login success",
      errors: null,
      data: user
    }
  }

  @Get()
  @ApiCreatedResponse({ type: ResUserDto })
  async getUser(): Promise<ResUserDto> {
    const data = await this.userService.getAllUser()
    data.map((user) => {
      delete user.password
      user.avatar = `${process.env.HOST}:${process.env.APP_PORT}/api/${user.avatar}`
      return user
    })

    return {
      success: true,
      message: "Get all user success",
      errors: null,
      data
    }
  }

  // @Get("/token/:userId")
  // @ApiCreatedResponse({ type: ResUserDto })
  // async getUserByToken(@Param("userId") userId: string): Promise<ResUserDto> {
  //   const data = await this.userService.handleInterval(userId)
  //   return {
  //     success: true,
  //     message: "Get user by token success",
  //     errors: null,
  //     data
  //   }
  // }

  @UseGuards(AuthGuard)
  @Put("update")
  @ApiHeader({
    name: "Authorization",
    description: "Authorization: Token jwt.token.here"
  })
  @ApiBody({ type: UserRequestUpdateDto })
  @ApiCreatedResponse({ type: ResUserDto })
  @UsePipes(new CustomValidationPipe())
  async updateCurrentUser(
    @Headers("Authorization") auth: Token,
    @Body("user") userUpdateDto: UserUpdateDto
  ): Promise<ResUserDto> {
    console.log("userUpdateDto", userUpdateDto)
    console.log("auth", auth)
    return await this.userService.updateUser(userUpdateDto, auth)
  }
}
