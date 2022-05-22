import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {UsersModule} from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import { RolesController } from './roles/roles.controller';
import { RolesService } from './roles/roles.service';
import { RolesModule } from './roles/roles.module';

@Module({
    controllers: [RolesController],
    providers: [RolesService],
    imports: [
        ConfigModule.forRoot({envFilePath: '.env'}),
        MongooseModule.forRoot(process.env.MONGO_URI),
        UsersModule,
        RolesModule
    ]
})
export class AppModule {

}