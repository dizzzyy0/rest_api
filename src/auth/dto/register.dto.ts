import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum, IsString, IsDate } from 'class-validator';

export class RegisterDTO {
    @ApiProperty({type: String, example: 'JohnDoe' })
    @IsNotEmpty()
    @IsString()
    readonly username: string;

    @ApiProperty({type: String, example: 'Doe' })
    @IsNotEmpty()
    @IsString()
    readonly surename: string; 

    @ApiProperty({type: String, example: 'johndoe@example.com' })
    @IsNotEmpty()
    @IsString()
    readonly email: string;

    @IsEnum(['client', 'support', 'admin'])
    readonly role: 'client' | 'support' | 'admin'; 

    @ApiProperty({type: String, example: 'strongPassword123' })
    @IsNotEmpty()
    @IsString()
    readonly password: string; 

    @IsNotEmpty()
    @IsDate()
    readonly created_at: Date;
}
