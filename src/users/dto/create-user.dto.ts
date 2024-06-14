import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MaxLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(60)
    name: string;

    @IsStrongPassword({
        "minLength": 10,
        "minLowercase": 2,
        "minNumbers": 2,
        "minSymbols": 2,
        "minUppercase": 2,
    })
    password: string
}