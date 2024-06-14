import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Project, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ProjectService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.ProjectCreateInput, userId): Promise<Project> {
    return this.prisma.project.create({
      data: {
        name: data.name,
        user: {
          connect: { id: userId },
        },
      },
    });
  }

  async findAll(userId: number): Promise<Project[]> {
    return this.prisma.project.findMany({
      where: {
        userId,
      },
      include: {
        tasks: true,
      },
    });
  }

  async findOne(id: number, userId: number): Promise<Project> | null {
    return this.prisma.project.findUnique({
      where: {
        id,
        userId,
      },
      include: {
        tasks: true,
      },
    });
  }

  async update(
    id: number,
    data: Prisma.ProjectUpdateInput,
    userId: number,
  ): Promise<Project> {
    const project = await this.exists(id, userId);

    return this.prisma.project.update({
      where: {
        id,
      },
      data: {
        name: data.name,
      },
    });
  }

  async remove(id: number, userId: number): Promise<Project> | never {
    await this.exists(id, userId);

    return this.prisma.project.delete({
      where: {
        id,
      },
    });
  }

  async exists(id: number, userId: number) {
    const project = await this.prisma.project.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!project) {
      throw new NotFoundException(`ProjectId ${id} not found`);
    }

    return project;
  }
}
