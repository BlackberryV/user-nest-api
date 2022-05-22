import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./schemas/user.schema";

@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @ApiOperation({summary: 'Creation of user'})
    @ApiResponse({status: 201, type: User})
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.create(userDto)
    }

    @ApiOperation({summary: 'Get all users'})
    @ApiResponse({status: 200, type: [User]})
    @Get()
    getAll(): Promise<User[]> {
        return this.usersService.getAll()
    }

    @ApiOperation({summary: 'Get one user by id'})
    @ApiResponse({status: 200, type: User})
    @Get(':id')
    getOne(@Param('id') id): Promise<User> {
        return this.usersService.getById(id)
    }

    @ApiOperation({summary: 'Delete user by id'})
    @ApiResponse({status: 200, type: User})
    @Delete(':id')
    remove(@Param('id') id: string): Promise<User> {
        return this.usersService.removeById(id)
    }
}
