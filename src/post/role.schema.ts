import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose, {Document} from "mongoose";
import {User} from "../users/schemas/user.schema";

export type PostDocument = Post & Document

@Schema()
export class Post {

    @Prop({required: true})
    title: string

    @Prop({required: true})
    content: string

    @Prop({required: true})
    image: string

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    author: User

    _id: string;
}

export const PostSchema = SchemaFactory.createForClass(Post)