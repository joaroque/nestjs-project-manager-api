import { Injectable, NotFoundException } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) { }

    async encryptPassword(password: any) {
        const salt = await bcrypt.genSalt();
        const encryptedPassword =  await bcrypt.hash(password, salt)

        return encryptedPassword;
    }

    async create(data: Prisma.UserCreateInput): Promise<User> {
        data.password = await this.encryptPassword(data.password);

        return this.prisma.user.create({
            data
        })
    }

    async findAll(): Promise<User[]> {
        return this.prisma.user.findMany()
    }

    async findOne(id: number): Promise<User> | null {
        return this.prisma.user.findUnique({
            where: {
                id
            }
        })
    }

    async update(id: number, data: Prisma.UserUpdateInput ): Promise<User> {        
        await this.exists(id)
        data.password = await this.encryptPassword(data.password);

        return this.prisma.user.update({
            where: {
                id
            },
            data
        })
    }

    async remove(id: number): Promise<User> | never {
        await this.exists(id)

        return this.prisma.user.delete({
            where: {
                id
            }
        })
    }

    async exists(id: number) {
        const user = await this.prisma.user.count({
            where: {
                id
            }
        })
        if (!user) {
            throw new NotFoundException(`User ${id} not found`);
        }
    }
}