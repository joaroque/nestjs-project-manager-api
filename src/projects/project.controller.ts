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
import { ProjectService } from "./project.service";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateUserDto } from "./dto/update-project.dto";
import { Prisma } from "@prisma/client";

@Controller('projects')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) { }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id) {
        return this.projectService.findOne(id);
    }

    @Get()
    async findAll() {
        return this.projectService.findAll();
    }

    @Post()
    async create(@Body() data: Prisma.ProjectCreateInput) {
        return this.projectService.create(data);
    }

    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id, @Body() data: Prisma.ProjectUpdateInput) {
        return this.projectService.update(id, data);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id) {
        return this.projectService.remove(id);
    }
}