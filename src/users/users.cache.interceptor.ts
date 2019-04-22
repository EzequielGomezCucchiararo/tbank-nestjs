import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';

/**
 * In order to create a generic solution, you can take advantage of Reflector
 * and create a custom decorator. The Reflector is well described in the guards chapter.
 */

@Injectable()
export class UsersCacheInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const isCached = true;
    if (isCached) {
      return of(['Cached value example...']);
    }
    return next.handle();
  }
}
