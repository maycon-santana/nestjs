/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { ConfigModule } from '@nestjs/config';
import { FirebaseService } from 'src/firebase/firebase.service';

@Module({
    imports: [ConfigModule],
    controllers: [CatsController],
    providers: [CatsService, FirebaseService],
})
export class CatsModule {}
