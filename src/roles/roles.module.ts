import { Module } from '@nestjs/common';
import {RolesController} from "./roles.controller";
import {RolesService} from "./roles.service";
import {MongooseModule} from "@nestjs/mongoose";
import {Role, RoleSchema} from "./schemas/role.schema";
import {User, UserSchema} from "../users/schemas/user.schema";

@Module({
    controllers: [RolesController],
    providers: [RolesService],
    imports: [MongooseModule.forFeature([
        {name: Role.name, schema: RoleSchema},
        {name: User.name, schema: UserSchema}
    ])],
    exports: [RolesService]
})
export class RolesModule {}
