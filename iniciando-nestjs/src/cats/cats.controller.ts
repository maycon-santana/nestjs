/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';

@Controller('cats')
export class CatsController {
    @Get()
    findAll(): string {
        return 'Este ação retona todos os gatos';
    }
}
