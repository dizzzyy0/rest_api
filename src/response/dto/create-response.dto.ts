import { Types } from 'mongoose';
import { IsNotEmpty, IsString, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateResponseDTO {
    @ApiProperty({ type: String, example: '' })
    @IsNotEmpty()
    readonly requestId: Types.ObjectId;

    @ApiProperty({ type: String, example: '' })
    @IsNotEmpty()
    readonly userId: Types.ObjectId; 

    @ApiProperty({ type: String, example: '' })
    @IsNotEmpty()
    @IsString()
    readonly responseText: string; 

    @IsNotEmpty()
    @IsDate()
    readonly created_at: Date;
}
