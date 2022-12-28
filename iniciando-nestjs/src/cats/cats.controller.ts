/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Param, Body, Query, Put, Delete } from '@nestjs/common';
import { CreateCatDto } from './create-cat-dto';

@Controller('cats')
export class CatsController {
    @Post()
    create(@Body() createCatDto: CreateCatDto) {
        return 'Está ação adiciona um novo gato';
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return `Esta ação retorna o ID: #${id} de gatos`;
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return `Esta ação exclui pelo ID: #${id} o gato`;        
    }

}
