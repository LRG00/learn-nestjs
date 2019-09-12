import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
// import { HttpExceptionFilter } from './exception/http-exception.filter';
// import { AnyExceptionFilter } from './exception/any-exception.filter';
// import { ValidationPipe } from './pipe/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 全局注入异常过滤
  // app.useGlobalFilters(new HttpExceptionFilter());
  // 全局注入管道 验证
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(30000);
}
bootstrap();
