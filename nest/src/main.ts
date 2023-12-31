import { NestFactory } from "@nestjs/core"

import { AppModule } from "./app.module"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
// import { HttpExceptionFilter } from './common/common.filter';
import * as path from "path"
import { NestExpressApplication } from "@nestjs/platform-express"

if (process.env.NODE_ENV || process.env.NODE_ENV === "prod") {
  require("module-alias/register")
}
async function bootstrap() {
  const APP_PORT = process.env.APP_PORT
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true
  })

  app.setGlobalPrefix("api")
  app.useStaticAssets(path.join(__dirname, "..", "uploads"))

  const config = new DocumentBuilder()
    .setTitle("NestJS Prisma")
    .setDescription("NestJS Prisma API description")
    .setVersion("0.1")
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("doc", app, document)
  // app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(APP_PORT, () =>
    console.log(`===>>>> Server is running on port ${APP_PORT}`)
  )
}

bootstrap()
