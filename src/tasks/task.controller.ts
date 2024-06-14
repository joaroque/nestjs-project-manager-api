import { 
    Body, 
    Controller, 
    Delete, 
    Get, 
    Param, 
    ParseIntPipe, 
    Patch, 
    Post 
} from "@nestjs/common";
import { TaskService } from "./task.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { Prisma } from "@prisma/client";

@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id) {
        return this.taskService.findOne(id);
    }

    @Get()
    async findAll() {
        return this.taskService.findAll();
    }

    @Post()
    async create(@Body() data: CreateTaskDto) {
        return this.taskService.create(data);
    }

    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id, @Body() data: UpdateTaskDto) {
        return this.taskService.update(id, data);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id) {
        return this.taskService.remove(id);
    }
}