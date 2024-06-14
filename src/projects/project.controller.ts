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
import { UpdateProjectDto } from "./dto/update-project.dto";

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
    async create(@Body() data: CreateProjectDto) {
        return this.projectService.create(data);
    }

    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id, @Body() data: UpdateProjectDto) {
        return this.projectService.update(id, data);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id) {
        return this.projectService.remove(id);
    }
}