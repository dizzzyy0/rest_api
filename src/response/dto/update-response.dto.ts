import { Types } from 'mongoose';
import { IsNotEmpty, IsString, IsDate, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateResponseDTO {
    @ApiProperty({ type: String, example: '' })
    @IsOptional()
    @IsNotEmpty()
    requestId?: Types.ObjectId;

    @ApiProperty({ type: String, example: '' })
    @IsOptional()
    @IsNotEmpty()
    userId?: Types.ObjectId; 

    @ApiProperty({ type: String, example: '' })
    @IsOptional()
    @IsString()
    responseText?: string; 

    @IsNotEmpty()
    @IsDate()
    created_at: Date;
}
