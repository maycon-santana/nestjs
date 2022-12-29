/* eslint-disable prettier/prettier */
import { ForbiddenException } from './../exceptions/forbidden.exceptions';
import { Controller, Get, Post, Body, HttpException, HttpStatus} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat-dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
    constructor(private catsService: CatsService) {}

    @Post()
    async create(@Body() createCatDto: CreateCatDto) {
        this.catsService.create(createCatDto);
    }

    @Get()
    async findAll() {
        try {
            await this.catsService.findAll()
            console.log('OK', this.catsService.findAll())
        }catch (error) {
            throw new ForbiddenException();
        }
    }

}
