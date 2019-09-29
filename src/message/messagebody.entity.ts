// messages/message.entity.ts

import {Table, Column, Entity,PrimaryGeneratedColumn, BaseEntity, OneToOne, JoinColumn} from "typeorm";
import {Message} from "./message.entity";

@Entity()
export class Messagebody extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  body: number;

  @Column('text')
  ccc: string;

  @Column('int')
  www: number;

    @OneToOne(type => Message)
    @JoinColumn()
    photo: Message;

}