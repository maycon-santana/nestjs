/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './logger.middleware';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [
    CatsModule,
    MongooseModule.forRoot('mongodb://localhost:27017/projeto-nestjs', {
      connectionName: 'cats',
    }),
    AuthModule,
    UsersModule,
    RolesModule, 
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(LoggerMiddleware)
        .forRoutes({ path: 'cats', method: RequestMethod.GET });
  }
}
