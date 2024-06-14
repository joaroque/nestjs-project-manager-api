import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from 'src/decorators/user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enum/role.enum';

@Roles(Role.Admin, Role.User)
@UseGuards(AuthGuard, RoleGuard)
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id,
    @User('id', ParseIntPipe) userId,
  ) {
    return this.taskService.findOne(id, userId);
  }

  @Get()
  async findAll(@User('id', ParseIntPipe) userId) {
    return this.taskService.findAll(userId);
  }

  @Post()
  async create(@Body() data: CreateTaskDto, @User('id', ParseIntPipe) userId) {
    const projectId = Number(data.projectId);
    return this.taskService.create(data, projectId, userId);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id,
    @Body() data: UpdateTaskDto,
    @User('id', ParseIntPipe) userId,
  ) {
    return this.taskService.update(id, data, userId);
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id,
    @User('id', ParseIntPipe) userId,
  ) {
    return this.taskService.remove(id, userId);
  }
}
