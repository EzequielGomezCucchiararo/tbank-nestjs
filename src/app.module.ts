/**
 * The root module of the application.
 */

import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import * as pino from 'pino';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { CONSTANTS } from './constants';

const pinoLoggerProvider = {
  provide: CONSTANTS.loggerProviderSym,
  useValue: pino({
    prettyPrint: { colorize: true }
  }),
};

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [AppService, pinoLoggerProvider],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '/', method: RequestMethod.ALL });
  }
}
