import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { IS_PUBLIC_KEY } from "../decorators/public.decorator";


@Injectable()
export class JwtAuthGaurd extends AuthGuard('jwt'){
    constructor(private reflector: Reflector){
        super();
    }
    canActivate(context: ExecutionContext) { 
        const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass()
        ])
        if(isPublic){
            return true
        }
        return super.canActivate(context);
    }

    handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
        if(err || !user){
            throw err || new UnauthorizedException('توکن شما معتبر نیست');
        }
        return user;
    }
}