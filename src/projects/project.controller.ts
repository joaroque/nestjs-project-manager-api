import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/decorators/user.decorator';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enum/role.enum';

@Roles(Role.Admin, Role.User)
@UseGuards(AuthGuard, RoleGuard)
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id,
    @User('id', ParseIntPipe) userId,
  ) {
    return this.projectService.findOne(id, userId);
  }

  @Get()
  async findAll(@User('id', ParseIntPipe) userId) {
    return this.projectService.findAll(userId);
  }

  @Post()
  async create(@Body() data: CreateProjectDto, @User('id', ParseIntPipe) id) {
    return this.projectService.create(data, id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id,
    @Body() data: UpdateProjectDto,
    @User('id', ParseIntPipe) userId,
  ) {
    return this.projectService.update(id, data, userId);
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id,
    @User('id', ParseIntPipe) userId,
  ) {
    return this.projectService.remove(id, userId);
  }
}
