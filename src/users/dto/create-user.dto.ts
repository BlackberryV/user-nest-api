import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({example: 'email.gmail.com', description: 'Email'})
    readonly email: string
    @ApiProperty({example: 'gaskdvflahvf', description: 'Password'})
    readonly password: string
}