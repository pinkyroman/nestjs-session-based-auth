import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest(); // get request from the context
    return request.isAuthenticated(); // isAuthenticated() comes from passport automatically
  }
}
