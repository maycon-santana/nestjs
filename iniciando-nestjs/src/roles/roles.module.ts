/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './role.guards';

@Module({
    providers: [
        {
            provide: APP_GUARD, 
            useClass: RolesGuard,
        },
    ],
})
export class RolesModule {}
