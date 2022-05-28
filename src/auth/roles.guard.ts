import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException
} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import {Reflector} from "@nestjs/core";
import {ROLES_KEY} from "./roles-auth.decorator";


@Injectable()
export class RolesGuard implements CanActivate {

    constructor(
        private jwtService: JwtService,
        private reflector: Reflector
    ) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        try {
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass()
            ])
            if (requiredRoles.length === 0) {
                return true
            }
            const authHeader = req.headers.authorization
            const bearer = authHeader.split(' ')[0]
            const token = authHeader.split(' ')[1]

            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({message: 'User not authorized'})
            }

            const user = this.jwtService.verify(token)
            req.user = user
            console.log(requiredRoles, user.roles)
            console.log()
            user.roles.some(role => console.log(requiredRoles.includes(role.value)))
            return user.roles.some(role => requiredRoles.includes(role.value))
        } catch (e) {
            throw new HttpException('Do not permitted', HttpStatus.FORBIDDEN)
        }
    }

}

// @Injectable()
// export class RolesGuard implements CanActivate {
//
//     constructor(private jwtService: JwtService) {}
//
//     canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
//         const req = context.switchToHttp().getRequest()
//         try {
//             const authHeader = req.headers.authorization
//             const bearer = authHeader.split(' ')[0]
//             const token = authHeader.split(' ')[1]
//
//             if (bearer !== 'Bearer' || !token) {
//                 throw new UnauthorizedException({message: 'User not authorized'})
//             }
//
//             const user = this.jwtService.verify(token)
//             req.user = user
//             return true
//         } catch (e) {
//             throw new UnauthorizedException({message: 'User not authorized'})
//         }
//     }
//
// }