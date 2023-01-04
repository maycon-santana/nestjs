/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CatsModule } from './cats/cats.module';
import { FirebaseService } from './firebase/firebase.service';

@Module({
  imports: [CatsModule, ConfigModule.forRoot()],
  providers: [FirebaseService],
})
export class AppModule {}

