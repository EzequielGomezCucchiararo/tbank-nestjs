import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { CONSTANTS } from '../constants';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject(CONSTANTS.loggerProviderSym)
    private readonly logger: any,
  ) {}
  use(req: Request, res: Response, next: () => void) {
    this.logger.info(`${req.method} to ${req.url}`);
    next();
  }
}
