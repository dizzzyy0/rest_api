import { Types } from 'mongoose';
import { IsNotEmpty, IsEnum, IsString, IsDate, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRequestDTO {
    @ApiProperty({ type: String, example: '' })
    @IsOptional()
    requestNumber: number;

    @ApiProperty({ type: String, example: '' })
    @IsOptional()
    userId: Types.ObjectId; 

    @ApiProperty({ type: String, enum: ['open', 'in_progress', 'closed'], example: 'open' })
    @IsOptional()
    @IsEnum(['open', 'in_progress', 'closed'])
    status: 'open' | 'in_progress' | 'closed'; 

    @ApiProperty({ type: String, example: '' })
    @IsOptional()
    @IsString()
    problemDescription: string; 

    @IsNotEmpty()
    @IsDate()
    created_at: Date;
}
