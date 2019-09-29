import {Table, Column, PrimaryGeneratedColumn, Entity, OneToOne, ManyToOne, ManyToMany, } from "typeorm";
import {PhotoMetadata} from "./photoMetadata.entity";
import {Author} from "./author.entity";
import {Album} from "./album.entity";

@Entity()
export class Photo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 500
    })
    name: string;

    @Column("text")
    description: string;

    @Column()
    fileName: string;

    @Column("int")
    views: number;

    @Column()
    isPublished: boolean;

    // 一对一 双项
    @OneToOne(type => PhotoMetadata, photoMetadata => photoMetadata.photo)
    // @JoinColumn()
    metadata: PhotoMetadata;

    @ManyToOne(type => Author, author => author.photos)
    author: Author;

    @ManyToMany(type => Album, album => album.photos)
    albums: Album[];
}