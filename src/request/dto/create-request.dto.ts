import { Types } from 'mongoose';
import { IsNotEmpty, IsEnum, IsString, IsDate, IsOptional, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/interfaces/user.interface';

export class CreateRequestDTO {
    @ApiProperty({ type: String, example: '' })
    @IsNotEmpty()
    readonly requestNumber: number;

    @ApiProperty({ type: String, example: '' })
    @IsNotEmpty()
    readonly userId: Types.ObjectId | User; 

    @ApiProperty({ type: String, enum: ['open', 'in_progress', 'closed'], example: 'open' })
    @IsNotEmpty()
    @IsEnum(['open', 'in_progress', 'closed'])
    readonly status: 'open' | 'in_progress' | 'closed'; 

    @ApiProperty({ type: String, example: '' })
    @IsNotEmpty()
    @IsString()
    readonly problemDescription: string; 

    @ApiProperty({ type: [String], required: false, example: [] })
    @IsOptional()
    @IsArray()
    readonly responses?: Types.ObjectId[];
    
    @IsNotEmpty()
    @IsDate()
    readonly created_at: Date;
}
