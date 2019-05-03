import { Module } from '@nestjs/common';

import { CONSTANTS } from '../constants';

import * as pino from 'pino';

const loggerProvider = {
  provide: CONSTANTS.loggerProviderSym,
  useValue: pino({
    prettyPrint: { colorize: true },
  }),
};

@Module({
  providers: [loggerProvider],
  exports: [loggerProvider],
})
export class UtilsModule {}
