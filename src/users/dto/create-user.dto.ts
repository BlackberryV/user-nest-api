import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class CreateUserDto {
    @ApiProperty({example: 'email.gmail.com', description: 'Email'})
    @IsString({message: 'Has to be a string'})
    @IsEmail({}, {message: 'Not correct email'})
    readonly email: string

    @ApiProperty({example: 'gaskdvflahvf', description: 'Password'})
    @IsString({message: 'Has to be a string'})
    @Length(4, 20, {message: 'Need to be between 6 and 20 symbols'})
    readonly password: string
}