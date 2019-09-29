import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { Photo } from "./photo.entity";

@Entity()
export class PhotoMetadata {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("int")
  height: number;

  @Column("int")
  width: number;

  @Column()
  orientation: string;

  @Column()
  compressed: boolean;

  @Column()
  comment: string;
  // 一对一 单项
  // @OneToOne(type => Photo)
  // @JoinColumn()
  // photo: Photo;
  
  // 一对一 双项
  @OneToOne(type => Photo, photo => photo.metadata)
  @JoinColumn()
  photo: Photo;
}