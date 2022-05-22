import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "./schemas/user.schema";
import {Model} from "mongoose";
import {CreateUserDto} from "./dto/create-user.dto";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async getAll(): Promise<User[]> {
        return this.userModel.find()
    }

    async getById(id: string): Promise<User> {
        return this.userModel.findById(id)
    }

    async removeById(id: string): Promise<User> {
        return this.userModel.findByIdAndRemove(id)
    }

    async create(userDto: CreateUserDto): Promise<User> {
        const newUser = new this.userModel(userDto)
        return newUser.save()
    }
}
