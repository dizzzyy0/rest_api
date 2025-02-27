import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum, IsString, IsDate } from 'class-validator';

export class LoginDTO {
    @ApiProperty({type: String, example: 'johndoe@example.com' })
    @IsNotEmpty()
    @IsString()
    readonly email: string;

    @ApiProperty({type: String, example: 'strongPassword123' })
    @IsNotEmpty()
    @IsString()
    readonly password: string; 
}
