import { UseInterceptors, UseGuards, UsePipes, UseFilters, Controller, Get, Post, Param, Req, Res, HttpStatus, Query, Body, Delete, Put, HttpException, UploadedFile } from '@nestjs/common';
import { Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ForbiddenException } from '../exception/forbidden.exception';
import { CreateCatDto, ListAllEntities } from './create-cat.dto'
import { CatsService } from './cats.service';
import { ValidationPipe } from '../pipe/validation.pipe';
import { LoggingInterceptor } from '../interceptors/logging.interceptor';
import { TransformInterceptor } from '../interceptors/transform.interceptor';
import { RolesGuard } from '../guard/roles.guard';
import { Roles } from '../decorator/roles.decorator';
import * as fs from 'fs';
import * as path from 'path';
import { diskStorage } from 'multer'
@Controller('cats')
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}
  // @Get()
  // findAll(@Query('limit') limit: ListAllEntities, @Query('page') page: ListAllEntities): string {
  //   return `This action returns all cats (limit: limit=${limit} page=${page}items)`;
  // }

  // @Get()
  // findAll(@Req() request: Request): string {
  //   console.log(request.query)
  //   return 'This action retusrns all cats';
  // }

  //假设这个路由处理器由于某种原因会抛出一个异常。我们要硬编码它
  @Get()
  async findAll() {
    throw new ForbiddenException();
  }
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads'
      , filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        cb(null, `${randomName}${path.extname(file.originalname)}`)
      }
    })
  }))
  uploadFile(@UploadedFile() file) {
    console.log(file, '00000000000');
    return file
  }
  @Get(':id')
  findOne(@Param() params): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }
  @Get('xxx/:id')
  findOne1(@Param('id') id): string {
    console.log(id, 'iii');
    return `This action returns a #${id} cat`;
  }

  @Post('xxx')
  @Roles('admin')
  // 或者 @UsePipes(ValidationPipe)
  // @UsePipes(new ValidationPipe())
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
    return `This action add a cat`
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() createCatDto: CreateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}