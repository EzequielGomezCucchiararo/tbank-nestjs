import {
  CallHandler,
  ExecutionContext, Inject,
  Injectable,
  NestInterceptor,
}                     from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap }        from 'rxjs/operators';
import { CONSTANTS }  from '../constants';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {

  constructor(
    @Inject(CONSTANTS.loggerProviderSym)
    private readonly logger: any,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();

    return next.handle().pipe(
      tap(() => {
        this.logger.info(`After... ${Date.now() - now}ms.`);
      }),
    );
  }
}
