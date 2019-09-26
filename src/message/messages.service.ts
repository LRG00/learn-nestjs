import { Injectable, Delete, Param } from '@nestjs/common';
// ORM
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';
import { CreateMessageDto } from './create.message.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messagesRepository: Repository<Message>,
  ) { }

  private readonly messages: Message[] = [];
  // 新增数据
  async create(CreateMessageDto: CreateMessageDto): Promise<Message> {
    return await this.messagesRepository.save(CreateMessageDto);
  }
  async updateMessage(id, data: CreateMessageDto){
    const message = new CreateMessageDto();
    message.content = data.content;
    return await this.messagesRepository.update(id, message); // 用data里的值更新到数据库
}
  // 查找一条数据
  async findOne(id: number): Promise<Message> {
    return await this.messagesRepository.findOne({ id });
  }
  // 查询全部数据
  async findAll(): Promise<Message[]> {
    return await this.messagesRepository.find();
  }
}