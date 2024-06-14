import { Type } from "class-transformer";
import { 
    IsEmail, 
    IsEnum, 
    IsNotEmpty, 
    IsOptional, 
    IsString, 
    IsStrongPassword, 
    MaxLength 
} from "class-validator";
import { Role } from "src/enum/role.enum";

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

    @IsOptional()
    @Type(() => Number)
    @IsEnum(Role)
    role: number;
}