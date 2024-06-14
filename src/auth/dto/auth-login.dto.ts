import { IsEmail, IsNotEmpty, IsStrongPassword, } from "class-validator";

export class AuthLoginDto {

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsStrongPassword({
        "minLength": 10,
        "minLowercase": 0,
        "minSymbols": 0,
        "minUppercase": 0
    })
    password: string;


}