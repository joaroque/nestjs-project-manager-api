import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "src/users/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
    imports: [
        UserModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET
        }),
        PrismaModule
    ],
    controllers: [AuthController],
    providers: [AuthService, ],
    exports: [AuthService]
})
export class AuthModule {}