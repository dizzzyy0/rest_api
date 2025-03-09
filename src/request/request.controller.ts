import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestService } from './request.service';
import { JwtAuthGuard } from 'src/auth/jwt.auth-guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateRequestDTO } from './dto/create-request.dto';
import { UpdateRequestDTO } from './dto/update-request.dto';
import { UpdateStatusDTO } from './dto/update-status.dto';
import { CreateResponseDTO } from 'src/response/dto/create-response.dto';

@ApiTags('Request Managment')
@ApiBearerAuth('JWT-auth')
@Controller('request')
export class RequestController {
    constructor(private requestService: RequestService) {}

    @ApiOperation({ summary: 'Creating new request' })
    @ApiResponse({ status: 201, description: 'Request successfully created' })
    @ApiResponse({ status: 400, description: 'Invalid data' })
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.CREATED)
    @Post()
    async create(@Body() createRequestDTO: CreateRequestDTO) {
        return this.requestService.createRequest(createRequestDTO);
    }

    @ApiOperation({ summary: 'Get all requests' })
    @ApiResponse({ status: 200, description: 'Request list successfully retrieved' })
    @Get('all')
    async getAllRequests(){
        return this.requestService.getAllRequest();
    }

    @ApiParam({ name: 'requestId', description: 'Request ID' })
    @ApiOperation({ summary: 'Get unique request by ID' })
    @ApiResponse({ status: 200, description: 'Request successfully found' })
    @ApiResponse({ status: 404, description: 'Request not found' })
    @Get(':requestId')
    async getRequestById(@Param('requestId') requestId: string){
        return this.requestService.getRequestById(requestId);
    }

    @ApiParam({ name: 'requestId', description: 'Request ID' })
    @ApiOperation({ summary: 'Updating request information' })
    @ApiResponse({ status: 200, description: 'Request successfully updated' })
    @ApiResponse({ status: 404, description: 'Request not found' })
    @UseGuards(JwtAuthGuard)
    @Put(':requestId')
    async updateRequest(@Param('requestId') requestId: string, @Body() updateRequestDTO: UpdateRequestDTO){
        return this.requestService.updateRequest(requestId, updateRequestDTO);
    }

    @ApiParam({ name: 'requestId', description: 'Request ID' })
    @ApiOperation({ summary: 'Update request status' })
    @ApiResponse({ status: 200, description: 'Status successfully updated' })
    @ApiResponse({ status: 404, description: 'Request not found' })
    @UseGuards(JwtAuthGuard)
    @Put(':requestId/status')
    async updateStatus(@Param('requestId') requestId: string, @Body() updateStatusDTO: UpdateStatusDTO) {
        return this.requestService.updateStatus(requestId, updateStatusDTO);
    }

    @ApiParam({ name: 'requestId', description: 'Request ID' })
    @ApiOperation({ summary: 'Add response to request' })
    @ApiResponse({ status: 201, description: 'Response successfully added' })
    @ApiResponse({ status: 404, description: 'Request not found' })
    @UseGuards(JwtAuthGuard)
    @Post(':requestId/response')
    async addResponse(@Param('requestId') requestId: string, @Body() createResponseDTO: CreateResponseDTO) {
        return this.requestService.addResponse(requestId, createResponseDTO);
    }

    @Get()
    @ApiOperation({ summary: 'Find requests by status or client' })
    @ApiResponse({ status: 200, description: 'Requests successfully retrieved' })
    @ApiQuery({ name: 'status', required: false, type: String })
    @ApiQuery({ name: 'clientId', required: false, type: String })
    async findRequests(@Query('status') status?: string, @Query('clientId') clientId?: string) {
        return this.requestService.findRequests(status, clientId);
    }

    @ApiParam({ name: 'requestId', description: 'Request ID' })
    @ApiOperation({ summary: 'Get request with responses' })
    @ApiResponse({ status: 200, description: 'Request successfully retrieved with responses' })
    @ApiResponse({ status: 404, description: 'Request not found' })
    @Get(':requestId/responses')
    async getRequestWithResponses(@Param('requestId') requestId: string) {
        return this.requestService.getRequestWithResponses(requestId);
    }

    @ApiParam({ name: 'requestId', description: 'Request ID' })
    @ApiOperation({ summary: 'Delete request' })
    @ApiResponse({ status: 200, description: 'Request successfully deleted' })
    @ApiResponse({ status: 404, description: 'Request not found' })
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':requestId')
    async deleteRequest(@Param('requestId') requestId: string){
        return this.requestService.deleteRequest(requestId);
    }
}