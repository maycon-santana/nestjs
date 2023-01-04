/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CatsModule } from './cats/cats.module';
import { YoutubeModule } from './broadcasts/youtube/youtube.module';

@Module({
  imports: [CatsModule, YoutubeModule, ConfigModule.forRoot()],
})
export class AppModule {}

