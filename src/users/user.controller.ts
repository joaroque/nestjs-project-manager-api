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
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id) {
        return this.userService.findOne(id);
    }

    @Get()
    async findAll() {
        return this.userService.findAll();
    }

    @Post()
    async create(@Body() data: CreateUserDto) {
        return this.userService.create(data);
    }

    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id, @Body() data: UpdateUserDto) {
        return this.userService.update(id, data);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id) {
        return this.userService.remove(id);
    }
}