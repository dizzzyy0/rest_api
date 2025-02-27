import { IsOptional, IsEnum, IsString, IsDate, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateUserDTO {
    @ApiProperty({ type: String, example: '' })
    @IsOptional()
    @IsString()
    username?: string;

    @ApiProperty({ type: String, example: '' })
    @IsOptional()
    @IsString()
    surename?: string; 

    @ApiProperty({ type: String, example: '' })
    @IsOptional()
    @IsString()
    email?: string; 

    @ApiProperty({ type: String, example: '' })
    @IsEnum(['client', 'support', 'admin'])
    role?: 'client' | 'support' | 'admin'; 

    @ApiProperty({ type: String, example: '' })
    @IsOptional()
    @IsString()
    password?: string; 

    @IsNotEmpty()
    @IsDate()
    readonly created_at: Date;
}
