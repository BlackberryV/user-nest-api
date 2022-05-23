import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "./schemas/user.schema";
import {Model} from "mongoose";
import {CreateUserDto} from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";

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
        return this.userModel.findById(id)
    }

    async removeById(id: string): Promise<User> {
        return this.userModel.findByIdAndRemove(id)
    }

    async create(userDto: CreateUserDto): Promise<User> {
        const newUser = new this.userModel(userDto)
        const role = await this.rolesService.getRoleByValue('USER')
        await newUser.$set('roles', [role._id])
        return newUser.save()
    }
}
