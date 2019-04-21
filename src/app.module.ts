/**
 * The root module of the application.
 */

import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { AppController }             from './app.controller';
import { AppService }                from './app.service';
import { UsersModule }               from './users/users.module';
import { LoggerMiddleware }          from './middlewares/logger.middleware';
import { APP_FILTER }                from '@nestjs/core';
import { HttpExceptionFilter }       from './filters/http-exception.filter';
import { ValidationExceptionFilter } from './filters/validation-exception.filter';

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: ValidationExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '/', method: RequestMethod.ALL });
  }
}
