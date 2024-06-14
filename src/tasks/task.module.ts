import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { TaskService } from './task.service';
import { ProjectModule } from 'src/projects/project.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/users/user.module';

@Module({
  imports: [PrismaModule, ProjectModule, AuthModule, UserModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
