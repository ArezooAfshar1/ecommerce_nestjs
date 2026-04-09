import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { ROLE_KEY } from "../decorators/roles.decorator";


@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean{
        // get roles from metadata
        const requiredRoles = this.reflector.getAllAndOverride(ROLE_KEY, [
            context.getClass,
            context.getHandler()
        ])
        console.log(requiredRoles)

        if (!requiredRoles) return true;

        // get user data from jwt token
        const { user } = context.switchToHttp().getRequest();

        //check access role
        const hasRole = requiredRoles.includes(user.role);

        if( !hasRole) throw new ForbiddenException("شما به این مسیر دسترسی ندارید")

        return true
        
    }
}