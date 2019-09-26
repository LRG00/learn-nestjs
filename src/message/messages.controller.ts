import { Controller, Get, Post, Body, Delete, Param, Put } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { Message } from './message.entity';
import { CreateMessageDto } from './create.message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) { }

  @Get()
  findAll(): Promise<Message[]> {
    return this.messagesService.findAll();
  }
  @Post()
  create(@Body() CreateMessageDto: CreateMessageDto) {
    return this.messagesService.create(CreateMessageDto);
  }
  @Post('detail')
  findOne(@Body() Body) {
    console.log(Body, 'Body')
    return this.messagesService.findOne(Body.id);
  }
  @Put()
  updateUser(@Body('id') id, @Body() CreateMessageDto: CreateMessageDto) {
    return this.messagesService.updateMessage(id, CreateMessageDto);
  }
}