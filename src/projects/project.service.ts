import { Injectable, NotFoundException } from "@nestjs/common";
import { Prisma, Project, User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class ProjectService {
    constructor(private readonly prisma: PrismaService) { }

    async encryptPassword(password: any) {
        const salt = await bcrypt.genSalt();
        const encryptedPassword = await bcrypt.hash(password, salt)

        return encryptedPassword;
    }

    async create(data: Prisma.ProjectCreateInput): Promise<Project> {
        return this.prisma.project.create({
            data: {
                name: data.name,
                user: {
                    connect: { id: 2}
                }
            }
        });
    }

    async findAll(): Promise<Project[]> {
        return this.prisma.project.findMany()
    }

    async findOne(id: number): Promise<Project> | null {
        return this.prisma.project.findUnique({
            where: {
                id
            }
        })
    }

    async update(id: number, data: Prisma.ProjectUpdateInput): Promise<Project> {
        await this.exists(id)

        return this.prisma.project.update({
            where: {
                id
            },
            data
        })
    }

    async remove(id: number): Promise<Project> | never {
        await this.exists(id)

        return this.prisma.project.delete({
            where: {
                id
            }
        })
    }

    async exists(id: number) {
        const user = await this.prisma.project.count({
            where: {
                id
            }
        })
        if (!user) {
            throw new NotFoundException(`User ${id} not found`);
        }
    }
}