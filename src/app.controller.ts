import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { CONSTANTS } from './constants';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(CONSTANTS.loggerProviderSym)
    private readonly logger: any,
  ) {}

  @Get()
  getHello(): string {
    this.logger.info('Nice!!!!!!!!!!');
    return this.appService.getHello();
  }
}
