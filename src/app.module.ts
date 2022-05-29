import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {UsersModule} from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './post/posts.module';
import { FilesModule } from './files/files.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from 'path';

@Module({
    controllers: [],
    providers: [],
    imports: [
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static'),
        }),
        ConfigModule.forRoot({envFilePath: '.env'}),
        MongooseModule.forRoot(process.env.MONGO_URI),
        UsersModule,
        RolesModule,
        AuthModule,
        PostsModule,
        FilesModule
    ]
})
export class AppModule {

}