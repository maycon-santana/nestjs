/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FirebaseService } from 'src/firebase/firebase.service';
import { YoutubeController } from './youtube.controller';
import { YoutubeService } from './youtube.service';

@Module({
    imports: [ConfigModule],
    controllers: [YoutubeController],
    providers: [YoutubeService, FirebaseService],
})
export class YoutubeModule {}
