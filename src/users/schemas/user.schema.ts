import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose, {Document} from "mongoose";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../../roles/schemas/role.schema";
import {type} from "os";

export type UserDocument = User & Document

@Schema()
export class User {

    @ApiProperty({example: 'email@gmail.com', description: 'Email address'})
    @Prop({required: true, unique: true})
    email: string

    @ApiProperty({example: 'gaskdvflahvf', description: 'Password'})
    @Prop({required: true})
    password: string

    @ApiProperty({example: 'true', description: 'Banned or not'})
    @Prop({default: false})
    banned: boolean

    @ApiProperty({example: 'Banned for...', description: 'Reason of ban'})
    @Prop()
    banReason: string

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Role'}], required: true})
    roles: Role[]

    _id: string
}

export const UserSchema = SchemaFactory.createForClass(User)