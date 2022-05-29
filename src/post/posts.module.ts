import {Module} from '@nestjs/common';
import {PostsController} from './posts.controller';
import {PostsService} from './posts.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Post, PostSchema} from "./role.schema";
import {FilesModule} from "../files/files.module";

@Module({
    controllers: [PostsController],
    providers: [PostsService],
    imports: [
        MongooseModule.forFeature([
            {name: Post.name, schema: PostSchema}
        ]),
        FilesModule
    ],
})
export class PostsModule {
}
