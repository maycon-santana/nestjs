/* eslint-disable prettier/prettier */
import { ForbiddenException } from './../exceptions/forbidden.exceptions';
import { Controller, Get, Post, Body,Param} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat-dto';
import { CatsService } from './cats.service';
import { Cat } from './schemas/cat.schema';
import { Role } from 'src/roles/enums/role.enum';
import { Roles } from '../roles/role.decorador';

@Controller('cats')
export class CatsController {
    constructor(private catsService: CatsService) {}

    @Post()
    @Roles(Role.Admin)
    async create(@Body() createCatDto: CreateCatDto) {
        await this.catsService.create(createCatDto);
    }

    @Get("/")
    async findAll() {
        try {
            await this.catsService.findAll()
            console.log('Listar todos', this.catsService.findAll())
        }catch (error) {
            throw new ForbiddenException();
        }
        return this.catsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Cat> {
        return await this.catsService.findOne(id);
    }

}
