import {forwardRef, Module} from '@nestjs/common';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "./schemas/user.schema";
import {Role, RoleSchema} from "../roles/schemas/role.schema";
import {RolesService} from "../roles/roles.service";
import {RolesModule} from "../roles/roles.module";
import {AuthModule} from "../auth/auth.module";

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [
        forwardRef(() => AuthModule),
        MongooseModule.forFeature([
            {name: User.name, schema: UserSchema},
            {name: Role.name, schema: RoleSchema},
        ]),
        RolesModule
    ],
    exports: [UsersService]
})
export class UsersModule {
}
