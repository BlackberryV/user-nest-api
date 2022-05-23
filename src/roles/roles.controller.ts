import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {RolesService} from "./roles.service";
import {CreateRoleDto} from "./dto/create-role.dto";
import {Role} from "./schemas/role.schema";

@Controller('roles')
export class RolesController {
    constructor(private rolesService: RolesService) {}

    @Get(':value')
    getRoleByValue(@Param('value') value: string): Promise<Role> {
        return this.rolesService.getRoleByValue(value)
    }

    @Post()
    create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
        return this.rolesService.create(createRoleDto)
    }
}
