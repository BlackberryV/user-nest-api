import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "./schemas/user.schema";
import {Model} from "mongoose";
import {CreateUserDto} from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";
import {AddRoleDto} from "./dto/add-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private rolesService: RolesService
        ) {}

    async getUserByEmail(email: string) {
        return this.userModel.findOne({email}).populate('roles')
    }

    async getAll(): Promise<User[]> {
        return this.userModel.find().populate('roles')
    }

    async getById(id: string): Promise<User> {
        return this.userModel.findById(id).populate('roles')
    }

    async removeById(id: string): Promise<User> {
        return this.userModel.findByIdAndRemove(id)
    }

    async create(userDto: CreateUserDto): Promise<User> {
        const newUser = new this.userModel(userDto)
        const role = await this.rolesService.getRoleByValue('USER')
        await newUser.$set('roles', [role._id])
        await newUser.save()
        return newUser.populate('roles')
    }

    async addRole(dto: AddRoleDto): Promise<AddRoleDto> {
        const user = await this.userModel.findById(dto.userId)
        const role = await this.rolesService.getRoleByValue(dto.value)
        if (role && user) {
            await user.$set('roles', [...user.roles, role]).save()
            console.log(user.roles)
            return dto
        }
        throw new HttpException('User or role not found', HttpStatus.NOT_FOUND)
    }

    async ban(dto: BanUserDto): Promise<BanUserDto> {
        const user = await this.userModel.findById(dto.userId)
        if (user) {
            await user.$set('banned', true)
            await user.$set('banReason', dto.reason)
            user.save()
            return dto
        }
        throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
}
