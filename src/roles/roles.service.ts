import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Role, RoleDocument} from "./schemas/role.schema";
import {Model} from "mongoose";
import {CreateRoleDto} from "./dto/create-role.dto";

@Injectable()
export class RolesService {
    constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) {}

    async create(createRoleDto: CreateRoleDto): Promise<Role> {
        const newRole = await this.roleModel.create(createRoleDto)
        return newRole.save()
    }

    async getRoleByValue(value: string): Promise<Role> {
        return this.roleModel.findOne({value})
    }
}
