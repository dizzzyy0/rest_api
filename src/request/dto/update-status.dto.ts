import { Types } from 'mongoose';
import { IsNotEmpty, IsEnum, IsString, IsDate, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStatusDTO {
    @ApiProperty({ type: String, enum: ['open', 'in_progress', 'closed'], example: 'open' })
    @IsOptional()
    @IsEnum(['open', 'in_progress', 'closed'])
    status: 'open' | 'in_progress' | 'closed'; 
}
