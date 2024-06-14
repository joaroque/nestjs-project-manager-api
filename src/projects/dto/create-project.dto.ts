import { Prisma, User } from "@prisma/client";
import { IsEmail, IsNotEmpty, IsNumber, IsString, IsStrongPassword } from "class-validator";

export class CreateProjectDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    userId: number;

    user: Prisma.UserCreateNestedOneWithoutProjectsInput
}