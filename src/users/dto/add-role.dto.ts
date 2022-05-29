import {IsString} from "class-validator";

export class AddRoleDto {
    @IsString({message: 'Has to be string value'})
    readonly value: string
    @IsString({message: 'Has to be string value'})
    readonly userId: string
}