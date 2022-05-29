import { Injectable } from '@nestjs/common';
import {CreatePostDto} from "./dto/create-post.dto";
import {InjectModel} from "@nestjs/mongoose";
import {Post, PostDocument} from "./role.schema";
import {Model} from "mongoose";
import {FilesService} from "../files/files.service";

@Injectable()
export class PostsService {

    constructor(
        @InjectModel(Post.name) private postModel: Model<PostDocument>,
        private filesService: FilesService
        ) {}

    async create(dto: CreatePostDto, image) {
        const fileName = await this.filesService.createFile(image)
        console.log(fileName)
        console.log(dto)
        const post = await this.postModel.create({...dto, image: fileName})
        await post.save()
        return post
    }
}
