import {Table, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, Entity} from "typeorm";
import {Photo} from "./photo.entity";

@Entity()
export class Author {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @OneToMany(type => Photo, photo => photo.author) // 注意：我们将在下面的Photo类中创建author属性
    photos: Photo[];
  }
  