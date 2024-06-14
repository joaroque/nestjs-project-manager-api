import { 
    Body, 
    Controller, 
    Post, 
    Req, 
    UseGuards, 
    UseInterceptors 
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthLoginDto } from "./dto/auth-login.dto";
import { AuthResetDto } from "./dto/auth-reset.dto";
import { AuthForgetDto } from "./dto/auth-forget.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { User } from "src/decorators/user.decorator";
import { AuthRegisterDto } from "./dto/auth-register.dto";

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ) { }

    @Post('login')
    async login(@Body() { email, password }: AuthLoginDto) {
        return this.authService.login(email, password)
    }

    @Post('register')
    async register(@Body() data: AuthRegisterDto) {
        return this.authService.create(data);
    }

    @Post('forget')
    async forget(@Body() { email }: AuthForgetDto) {
        return this.authService.forget(email);
    }

    @Post('reset')
    async reset(@Body() { token, password }: AuthResetDto) {
        return this.authService.reset(token, password)

    }

    @UseGuards(AuthGuard)
    @Post('me')
    async me(@User() user) {
        return { user };
    }
}
