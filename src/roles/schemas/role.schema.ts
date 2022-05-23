import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose, {Document} from "mongoose";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../../users/schemas/user.schema";

export type RoleDocument = Role & Document

@Schema()
export class Role {

    @ApiProperty({example: 'ADMIN', description: 'Unique value of users role'})
    @Prop({required: true, unique: true})
    value: string

    @ApiProperty({example: 'Administrator', description: 'Role description'})
    @Prop({required: true})
    description: string

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    users: User[]

    _id: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role)