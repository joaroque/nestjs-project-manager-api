import { Prisma } from '@prisma/client';
import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumberString()
  userId: number;

  @IsOptional()
  user: Prisma.UserCreateNestedOneWithoutProjectsInput;
}
