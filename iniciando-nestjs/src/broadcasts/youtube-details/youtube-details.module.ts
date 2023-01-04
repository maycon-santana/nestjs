import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FirebaseService } from 'src/firebase/firebase.service';
import { YoutubeDetailsController } from './youtube-details.controller';
import { YoutubeDetailsService } from './youtube-details.service';

@Module({
  imports: [ConfigModule],
  controllers: [YoutubeDetailsController],
  providers: [YoutubeDetailsService, FirebaseService],
})
export class YoutubeDetailsModule {}
