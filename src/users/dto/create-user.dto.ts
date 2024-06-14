import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsStrongPassword({
        "minLength": 10,
        "minLowercase": 2,
        "minNumbers": 2,
        "minSymbols": 2,
        "minUppercase": 2,
    })
    password: string
}