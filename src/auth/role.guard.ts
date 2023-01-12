import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {
    
  }

  matchRoles(roles: string[], userRoles: string[]) {
    const intersection = roles.filter(element => userRoles.includes(element));
    if(intersection.length > 0) {
      return true
    } else {
      return false
    }
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles',context.getHandler())
    if(!roles) {
      return true
    }
    const req = context.switchToHttp().getRequest()
    const user = req.user
    return this.matchRoles(roles,user.roles);
  }
}
