import { Injectable, Delete, Param } from '@nestjs/common';
// ORM
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, createConnection } from 'typeorm';
import { Message } from './message.entity';
import { Photo } from './photo.entity';
import { PhotoMetadata } from './photoMetadata.entity';
import { Author } from './author.entity';
import { Album } from './album.entity';
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
  async findAll() {

    let photo = new Photo();
    photo.name = "lrg";
    photo.description = "我叫李1";
    photo.fileName = "photo-with-bears.jpg"
    photo.isPublished = true;
    let photoRepository = getRepository(Photo);
    // 创建一条 
    // let savedPhotos = await photoRepository.save(photo);

    // 查询所有
    // let getAll = await photoRepository.find();

    // 查询所有 name为lrg的记录
    // let getAllNameBylrg = await photoRepository.find({ name: 'lrg'});

    // // 查询一个 id为5的记录
    // let getOne1 = await photoRepository.findOne(5);

    // 查询一个 id为5的记录
    // let getOneByName = await photoRepository.findOne({ name: "lrg" });

    // let [allPhotos, photosCount] = await photoRepository.findAndCount();
    // console.log("所有照片: ", allPhotos);
    // console.log("总数量: ", photosCount);

    // console.log(getOne)

    // // 更新数据
    // let photoToUpdate = await photoRepository.findOne({name: "lrg"});
    // photoToUpdate.name = "leeruigan";
    // await photoRepository.save(photoToUpdate);

    // // 删除 id为 4 的数据
    // let photoToRemove = await photoRepository.findOne(4);
    // await photoRepository.remove(photoToRemove);


  }
  // 一对一
  async oneToOne() {

    // 创建 photo
    let photo = new Photo();
    photo.name = "韩梅梅";
    photo.description = "I am 韩梅梅";
    photo.fileName = "photo-with-bears.jpg";
    photo.isPublished = true;

        // 创建 photo metadata
        let metadata = new PhotoMetadata();
        metadata.height = 170;
        metadata.width = 66;
        metadata.compressed = true;
        metadata.comment = "cybershoot";
        metadata.orientation = "portait";
        metadata.photo = photo; // 联接两者

    // 获取实体 repositories
    let photoRepository = getRepository(Photo);
    let metadataRepository = getRepository(PhotoMetadata);

    // 先保存photo
    await photoRepository.save(photo);

    // 然后保存photo的metadata
    await metadataRepository.save(metadata);
    console.log('oneToOneoneToOneoneToOneoneToOne')
  }
  // 创建多对一/一对多关系
  async manyToOne() {

    // 创建 photo metadata
    let author = new Author();
    author.name = 'lrg';
    author.photos = [];

    // 创建 photo
    let photo = new Photo();
    photo.name = "xxx";
    photo.description = "I am xxx";
    photo.fileName = "photo-with-bears.jpg";
    photo.isPublished = true;
    photo.author = author;

    // 获取实体 repositories
    let photoRepository = getRepository(Photo);
    let authorRepository = getRepository(Author);

    await authorRepository.save(author);
    await photoRepository.save(photo);

    console.log('manyToOnemanyToOnemanyToOne')
  }
  // 创建多对多关系
  async manyToMany() {
    let albumRepository = getRepository(Album);
    // 创建一些 albums
    let album1 = new Album();
    album1.name = "Bears";
    await albumRepository.save(album1);
    
    let album2 = new Album();
    album2.name = "Me";
    await albumRepository.save(album2);
    
    // 创建一些 photos
    let photo = new Photo();
    photo.name = "Me and Bears";
    photo.description = "I am near polar bears";
    photo.fileName = "photo-with-bears.jpg";
    photo.albums = [album1, album2];
    await albumRepository.save(photo);
    
    // 现在我们的`photo`被保存了，并且'albums`被附加到它上面
    // 然后加载它们
    // const loadedPhoto = await getRepository(Photo).findOne(1, { relations: ["albums"] });

    console.log('manyToManymanyToManymanyToMany', loadedPhoto)
    return loadedPhoto
  }
  async getOneToOneData() {
    console.log('ll')
    // let photoRepository = getRepository(Photo);
    // let photos = await photoRepository.find({ relations: ["metadata"] });
    // 或者
    let photos = await getRepository(Photo)
    .createQueryBuilder("photo")
    .innerJoinAndSelect("photo.metadata", "metadata")
    .getMany();
    return photos
  }
}