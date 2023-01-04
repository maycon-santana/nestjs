/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CatsModule } from './cats/cats.module';
import { YoutubeModule } from './broadcasts/youtube/youtube.module';
import { YoutubeDetailsModule } from './broadcasts/youtube-details/youtube-details.module';

@Module({
  imports: [CatsModule, YoutubeModule, YoutubeDetailsModule, ConfigModule.forRoot()],
})
export class AppModule {}

