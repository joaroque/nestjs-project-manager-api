import {
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Completed } from '../../enum/completed.enum';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  title: string;

  @IsOptional()
  @Type(() => Number)
  @IsEnum(Completed)
  completed: boolean;

  @IsNumberString()
  projectId: number;

  @IsOptional()
  project: Prisma.ProjectCreateNestedOneWithoutTasksInput;
}
