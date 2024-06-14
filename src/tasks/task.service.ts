import { Injectable, NotFoundException } from "@nestjs/common";
import { Prisma, Project, Task, User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class TaskService {
    constructor(private readonly prisma: PrismaService) { }

    async encryptPassword(password: any) {
        const salt = await bcrypt.genSalt();
        const encryptedPassword = await bcrypt.hash(password, salt)

        return encryptedPassword;
    }

    async create(data: Prisma.TaskCreateInput): Promise<Task> {
        const id = 1;
        return this.prisma.task.create({
            data: {
                title: data.title,
                completed: Boolean(data.completed),
                projectId: id
            }
        })
    }

    async findAll(): Promise<Task[]> {
        return this.prisma.task.findMany()
    }

    async findOne(id: number): Promise<Task> | null {
        return this.prisma.task.findUnique({
            where: {
                id,
            }
        })
    }

    async update(id: number, data: Prisma.TaskUpdateInput): Promise<Task> {
        const project = await this.exists(id);
        const projectId = 1
        data.completed = Boolean(data.completed);

        return this.prisma.task.update({
            where: {
                id,
            },
            data
        })
    }

    async remove(id: number): Promise<Task> | never {
        await this.exists(id)

        return this.prisma.task.delete({
            where: {
                id,
            }
        })
    }

    async exists(id: number) {
        const user = await this.prisma.task.count({
            where: {
                id,
            }
        })
        if (!user) {
            throw new NotFoundException(`User ${id} not found`);
        }
    }
}