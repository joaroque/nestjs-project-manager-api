import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthService } from "src/auth/auth.service";
import { UserService } from "src/users/user.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const request = context.switchToHttp().getRequest();
        const { authorization } = request.headers;

        try {
            const token = (authorization ?? '').split(' ')[1];
            const data = this.authService.checkToken(token);
            const userData = await this.userService.findOne(data.id)

            request.tokenPayload = data;
            request.user = userData;

            console.log(token)
            console.log(userData)

            return true;

        } catch (e) {
            return false;
        }
    }


}