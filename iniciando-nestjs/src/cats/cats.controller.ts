/* eslint-disable prettier/prettier */
import { Controller, Req, Get } from '@nestjs/common';
import { Request } from 'express';

@Controller('cats')
export class CatsController {
    @Get()
    findAll(@Req() request: Request): string {
        return 'Este ação retona todos os gatos';
    }
}
