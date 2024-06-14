import { Module } from "@nestjs/common";
import { TaskController } from "./task.controller";
import { PrismaModule } from "../prisma/prisma.module";
import { TaskService } from "./task.service";

@Module({
    imports: [PrismaModule],
    controllers: [TaskController],
    providers: [TaskService]
})
export class TaskModule {}