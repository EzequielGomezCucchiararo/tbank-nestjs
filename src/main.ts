/**
 * The entry file of the application that creates a Nest application instance.
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ValidationExceptionFilter } from './filters/validation-exception.filter';
import { LoggerMiddleware } from './middlewares/logger.middleware';

/**
 * async function which will bootstrap the application
 */
async function bootstrap() {
  /**
   * Create the application object
   */
  const app = await NestFactory.create(AppModule);

  /**
   * If we want to bind middleware to every registered route at once,
   * we can use the use() method that is supplied by the
   * INestApplication instance:
   */

  // app.use(loggerMiddleware);

  /*
  activate a listener which listens to shutdown signals
   */
  app.enableShutdownHooks();

  /**
   * Apply global filters
   */
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new ValidationExceptionFilter());

  /**
   * User a middleware for all the routes
   */
  // app.use(new LoggerMiddleware().use);
  // app.use(logger);

  /**
   * Start up the listener for inbound HTTP requests.
   */
  await app.listen(3000);
}

/**
 * Bootstrap the application
 */
bootstrap();
