import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { EventsModule } from './events/events.module';
import { MessagesModule } from './message/messages.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    CatsModule,
    EventsModule,
    MessagesModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '120.77.239.216',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'abc',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
