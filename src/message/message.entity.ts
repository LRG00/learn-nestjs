// messages/message.entity.ts
import {Column, Entity,PrimaryGeneratedColumn, BaseEntity} from "typeorm";

// 这里可以修改表名
// @Entity('messages')
@Entity()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column('int', { name: 'user_id' })
  // userId: number;

  // @Column('text', { name: 'content' })
  // content: string;

  // @Column('int', { name: 'to_user_id' })
  // toUserId: number;

  // @Column('datetime', { name: 'created_time' })
  // createdTime: Date;

  // @Column('int')
  // creator: number;

  // @Column('datetime', { name: 'updated_time' })
  // updatedTime: Date;

  // @Column('int')
  // updator: number;
  @Column('int')
  user_id: number;

  @Column('text')
  content: string;

  @Column('int')
  to_user_id: number;

  @Column('datetime')
  created_time: Date;

  @Column('int')
  creator: number;

  @Column('datetime')
  updated_time: Date;

  @Column('int')
  updator: number;
}