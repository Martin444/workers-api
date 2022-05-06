import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from './decorators/role.decorator';
import { Role } from './models/roles.model';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<Role[]>(
            ROLES_KEY,
            context.getHandler(),
        );
        const request = context.switchToHttp().getResponse();
        const user = request.user;
        console.log(request);
        const isAuth = roles.some((role) => user.role.includes(role));
        if (isAuth) {
            return true;
        } else {
            throw new Error(
                'You do not have permission to access this resource',
            );
        }

        // return super.canActivate(context);
    }
}
