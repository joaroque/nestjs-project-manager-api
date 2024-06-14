import { PartialType } from "@nestjs/mapped-types";
import { AuthLoginDto } from "./auth-login.dto";

export class AuthForgetDto extends PartialType(AuthLoginDto) {}