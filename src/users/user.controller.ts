import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";

@Controller('users')
export class UserController {
    constructor() { }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id) {
        return { user: "Usuário 1", userId: id }
    }

    @Get()
    async findAll() {
        return { users: ["usuários"] }
    }

    @Post()
    async create(@Body() data) {
        return { data }
    }

    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id, @Body() data) {
        return { userId: id, data: data }
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id) {
        return { user: id, status: "removido" }
    }
}