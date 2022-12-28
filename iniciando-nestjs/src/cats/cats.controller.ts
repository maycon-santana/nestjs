/* eslint-disable prettier/prettier */
import { Controller, Req, Get, Post, Param } from '@nestjs/common';
import { Request } from 'express';

@Controller('cats')
export class CatsController {
    @Post()
    create(): string {
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
