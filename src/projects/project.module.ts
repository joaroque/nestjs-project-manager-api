import { Module } from "@nestjs/common";
import { ProjectController } from "./project.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { ProjectService } from "./project.service";

@Module({
    imports: [PrismaModule],
    controllers: [ProjectController],
    providers: [ProjectService]
})
export class ProjectModule {}