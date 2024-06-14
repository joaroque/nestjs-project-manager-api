import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, Project, Task, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { ProjectService } from 'src/projects/project.service';

@Injectable()
export class TaskService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly projectService: ProjectService,
  ) {}

  async create(
    data: Prisma.TaskCreateInput,
    projectId: number,
    userId: number,
  ): Promise<Task> {
    const project = await this.projectService.exists(projectId, userId);

    return this.prisma.task.create({
      data: {
        title: data.title,
        completed: Boolean(data.completed),
        projectId: project.id,
      },
    });
  }

  async findAll(userId) {
    const projects = await this.prisma.project.findMany({
      where: {
        userId: userId,
      },
    });

    if (projects.length === 0) {
      return [];
    }

    const projectIds = projects.map((project) => project.id);

    return this.prisma.task.findMany({
      where: {
        projectId: {
          in: projectIds,
        },
      },
    });
  }

  async findOne(id: number, userId: number): Promise<Task> | null {
    const task = await this.prisma.task.findUnique({
      where: {
        id,
      },
      include: {
        project: true,
      },
    });
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (task.project.userId !== userId) {
      throw new NotFoundException('Taks not found');
    }

    return task;
  }

  async update(
    id: number,
    data: Prisma.TaskUpdateInput,
    userId: number,
  ): Promise<Task> {
    const task = await this.prisma.task.findUnique({
      where: {
        id,
      },
      include: {
        project: true,
      },
    });

    if (!task) {
      throw new NotFoundException('Taks not found');
    }

    if (task.project.userId !== userId) {
      throw new NotFoundException('Taks not found');
    }

    data.completed = Boolean(data.completed);
    return this.prisma.task.update({
      where: {
        id,
      },
      data,
    });
  }

  async remove(id: number, userId: number): Promise<Task> | never {
    const task = await this.prisma.task.findUnique({
      where: {
        id,
      },
      include: {
        project: true,
      },
    });

    if (!task) {
      throw new NotFoundException('Taks not found');
    }

    if (task.project.userId !== userId) {
      throw new NotFoundException('Taks not found');
    }

    return this.prisma.task.delete({
      where: {
        id,
      },
    });
  }

  async exists(id: number) {
    const task = await this.prisma.task.count({
      where: {
        id,
      },
    });
    if (!task) {
      throw new NotFoundException(`User ${id} not found`);
    }

    return task;
  }
}
