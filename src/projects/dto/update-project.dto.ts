import { PartialType } from "@nestjs/mapped-types";
import { CreateProjectDto } from "./create-project.dto";

export class UpdateUserDto extends PartialType(CreateProjectDto) {}