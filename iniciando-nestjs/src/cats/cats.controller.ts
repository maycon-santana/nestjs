/* eslint-disable prettier/prettier */
import { Controller, Req, Get, Post } from '@nestjs/common';
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
}
