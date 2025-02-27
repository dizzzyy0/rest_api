import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Response } from './interfaces/response.interface';
import { Model } from 'mongoose';
import { CreateResponseDTO } from './dto/create-response.dto';
import { UpdateResponseDTO } from './dto/update-response.dto';

@Injectable()
export class ResponseService {
    constructor(@InjectModel('Response') private readonly responseModel: Model<Response>) {}

    async createResponse(createResponseDTO: CreateResponseDTO): Promise<Response>{
        const newResponse = new this.responseModel(createResponseDTO);
        return newResponse.save();
    }

    async getAllResponse(): Promise<Response[]>{
        const responses = await this.responseModel.find().exec();
        return responses;
    }

    async getResponseById(responseId: String): Promise<Response>{
        const response = await this.responseModel.findById(responseId).exec();

        if(!response){
            throw new NotFoundException(`Response with ID:${responseId} not found`)
        }

        return response;
    }

    async updateResponse(responseId: String, updateResponseDTO: UpdateResponseDTO): Promise<Response>{
        const updateResponse = await this.responseModel
        .findByIdAndUpdate(responseId, updateResponseDTO, {new: true}).exec();

        if(!updateResponse){
            throw new NotFoundException(`Response with ID:${responseId} not found`)
        }

        return updateResponse;
    }

    async deleteResponse(responseId: String): Promise<{ message: string }>{
        const deleteResponse = await this.responseModel.findByIdAndDelete(responseId).exec();

        if(!deleteResponse){
            throw new NotFoundException(`Response with ID:${responseId} not found`)
        }

        return {message: 'Response deleted successfully'};
    }
}
