/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CatsModule } from './cats/cats.module';
import { FirebaseService } from './firebase/firebase.service';
import { BroadcastsController } from './youtube/broadcasts/broadcasts.controller';
import { YoutubeController } from './broadcasts/youtube/youtube.controller';
import { YoutubeService } from './broadcasts/youtube/youtube.service';

@Module({
  imports: [CatsModule, ConfigModule.forRoot()],
  providers: [FirebaseService, YoutubeService],
  controllers: [BroadcastsController, YoutubeController],
})
export class AppModule {}

