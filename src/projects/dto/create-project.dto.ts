import { Prisma, User } from "@prisma/client";
import { IsEmail, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, IsStrongPassword } from "class-validator";

export class CreateProjectDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNumberString()
    userId: number;

    @IsOptional()
    user: Prisma.UserCreateNestedOneWithoutProjectsInput;

}
