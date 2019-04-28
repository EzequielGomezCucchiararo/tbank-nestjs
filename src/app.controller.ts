import { Controller, Get, Inject, Request } from '@nestjs/common';
import { AppService }                       from './app.service';
import { CONSTANTS }                        from './constants';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(CONSTANTS.pinoLoggerSym)
    private readonly logger: any,
  ) {}

  @Get()
  getHello(@Request() req): string {
    this.logger.info('hello');
    return this.appService.getHello();
  }
}
