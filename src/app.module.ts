import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [CatsModule, EventsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
