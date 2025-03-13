import { IsOptional, IsEnum, IsString, IsDate, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
export class UpdateUserDTO {
    @ApiProperty({ type: String, example: '' })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    username?: string;

    @ApiProperty({ type: String, example: '' })
    @IsOptional()
    @IsString()
    surename?: string; 

    @ApiProperty({ type: String, example: '' })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    email?: string; 

    @ApiProperty({ type: String, example: '' })
    @IsNotEmpty()
    @IsEnum(['client', 'support', 'admin'])
    role?: 'client' | 'support' | 'admin'; 

    @ApiProperty({ type: String, example: '' })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    password?: string; 

    @IsNotEmpty()
    @IsDate()
    readonly created_at: Date;
}
