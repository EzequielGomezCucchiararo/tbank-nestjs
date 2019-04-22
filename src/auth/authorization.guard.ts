import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Use context.getClass() if the metadata is set for the class controller
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }

    return true;

    // const request = context.switchToHttp().getRequest();
    // const user = request.user;
    // const hasRole = () => user.roles.some(role => roles.includes(role));

    // return user && user.roles && hasRole();
  }
}
