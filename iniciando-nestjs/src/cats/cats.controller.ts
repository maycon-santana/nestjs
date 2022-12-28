/* eslint-disable prettier/prettier */
import { Controller, Req, Get, Post, Param, Body } from '@nestjs/common';
import { Request } from 'express';
import { CreateCatDto } from './create-cat-dto';

@Controller('cats')
export class CatsController {
    @Post()
    create(@Body() createCatDto: CreateCatDto) {
        return 'Está ação adiciona um novo gato';
    }

    @Get()
    findAll(@Req() request: Request): string {
        return 'Este ação retona todos os gatos';
    }

    @Get(':id')
    findOne(@Param() params): string {
        console.log(params.id);
        return `Esta ação retorna o ID: #${params.id} de gatos`;
    }

}
