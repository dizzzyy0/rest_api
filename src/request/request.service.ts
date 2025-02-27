import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from './interfaces/request.interface';
import { Model } from 'mongoose';
import { CreateRequestDTO } from './dto/create-request.dto';
import { UpdateRequestDTO } from './dto/update-request.dto';
import { CreateResponseDTO } from 'src/response/dto/create-response.dto';
import { UpdateStatusDTO } from './dto/update-status.dto';

@Injectable()
export class RequestService {
    constructor(
        @InjectModel('Request') private readonly requestModel: Model<Request>,
        @InjectModel('Response') private readonly responseModel: Model<Response>
    ){}
    
    async createRequest(createRequestDTO: CreateRequestDTO): Promise<Request>{
        const newRequest = new this.requestModel({
          ...createRequestDTO,
          responses: [],
        });
        return newRequest.save();
    }

    async getAllRequest(): Promise<Request[]>{
        const requests = await this.requestModel.find().exec();
        return requests;
    }

    async getRequestById(requestId: String): Promise<Request>{
        const request = await this.requestModel.findById(requestId).exec();
        
        if(!request){
            throw new NotFoundException(`Request with ID:${requestId} not found`);
        }

        return request;
    }

    async updateRequest(requestId: String, updateRequestDTO: UpdateRequestDTO): Promise<Request>{
        const updateRequest = await this.requestModel
        .findByIdAndUpdate(requestId, updateRequestDTO, {new: true}).exec();

        if(!updateRequest){
            throw new NotFoundException(`Request with ID:${requestId} not found`);
        }

        return updateRequest;
    }

    async deleteRequest(requestId: String): Promise<{ message: string}>{
        const deleteRequest = await this.requestModel
        .findByIdAndDelete(requestId).exec();
        
        if(!deleteRequest){
            throw new NotFoundException(`Request with ID:${requestId} not found`);
        }

        return {message: 'Response deleted successfully'};
    }

    async updateStatus(requestId: string, updateStatusDTO: UpdateStatusDTO): Promise<Request> {
    const updatedRequest = await this.requestModel.findByIdAndUpdate(
      requestId,
      { status: updateStatusDTO.status },
      { new: true }
    ).exec();

    if (!updatedRequest) {
      throw new NotFoundException(`Request with ID:${requestId} not found`);
    }

    return updatedRequest;
  }

  async addResponse(requestId: string, createResponseDTO: CreateResponseDTO): Promise<Request> {
    const request = await this.requestModel.findById(requestId).exec();
    if (!request) {
      throw new NotFoundException(`Request with ID:${requestId} not found`);
    }

    const newResponse = new this.responseModel({
      ...createResponseDTO,
      requestId: request._id, 
      created_at: new Date(),
    });


    const savedResponse = await newResponse.save();

    if (!request.responses) {
      request.responses = [];
    }
    request.responses.push(savedResponse._id);
    await request.save();

    return request.populate('responses');
  }

  async findRequests(status?: string, clientId?: string): Promise<Request[]> {
    const filter: any = {};
    if (status) filter.status = status;
    if (clientId) filter.client = clientId;

    return this.requestModel.find(filter).populate('responses').exec();
  }

  async getRequestWithResponses(requestId: string): Promise<Request> {
    const request = await this.requestModel.findById(requestId).populate('responses').exec();
    if (!request) {
      throw new NotFoundException(`Request with ID:${requestId} not found`);
    }
    return request;
  }
}
