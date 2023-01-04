/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body,Param} from '@nestjs/common';
import { Cat } from 'src/models/cat.model';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
    constructor(private catsService: CatsService) {}

    @Post('login')
    public login(@Body() body: Pick<Cat, 'email' | 'password'>) {
        return this.catsService.login(body.email, body.password);
    }

    @Post('register')
    public register(@Body() body: Omit<Cat, 'id'>) {
      return this.catsService.register(body);
    }

}
