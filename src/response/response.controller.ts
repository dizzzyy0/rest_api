import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseService } from './response.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateResponseDTO } from './dto/create-response.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth-guard';
import { RolesGuard } from 'src/auth/role-decorator/roles.guard';
import { Roles } from 'src/auth/role-decorator/role.decorator';
import { UpdateResponseDTO } from './dto/update-response.dto';

@ApiTags('Response Managment')
@Controller('response')
@ApiBearerAuth('JWT-auth')
export class ResponseController {
    constructor(private responseService: ResponseService) {}

    @ApiOperation({ summary: 'Creating new response' })
    @ApiResponse({ status: 201, description: 'Response successfully created' })
    @ApiResponse({ status: 400, description: 'Invalid data' })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('support', 'admin')
    @HttpCode(HttpStatus.CREATED)
    @Post()
    async create(@Body() createResponseDTO: CreateResponseDTO) {
        return this.responseService.createResponse(createResponseDTO);
    }

    @UseInterceptors(FileInterceptor('file'))
    @ApiOperation({ summary: 'Get all Responses'})
    @ApiResponse({
        status: 200,
        description: 'Response list successfully retrived'
    })
    @ApiConsumes('multipart/form-data')
    @Get()
    async getAllResponses(){
        return this.responseService.getAllResponse();
    }

    @UseInterceptors(FileInterceptor('file'))
    @ApiParam({ name: 'responseId', description: 'Response ID'})
    @ApiOperation({ summary: 'Get unique response by ID'})
    @ApiResponse({ status: 200, description: 'Response successfully found'})
    @ApiResponse({ status: 400, description: 'Response not found' })
    @ApiConsumes('multipart/form-data')
    @Get(':responseId')
    async getResponseById(@Param('responseId') responseId: String){
        try{
            return await this.responseService.getResponseById(responseId);
        } catch (error){
            throw new NotFoundException(error.message);
        }
    }

    @UseInterceptors(FileInterceptor('file'))
    @ApiParam({ name: 'responseId', description: 'Response ID'})
    @ApiOperation({ summary: 'Updating response information'})
    @ApiResponse({ status: 200, description: 'Response successfully updated'})
    @ApiResponse ({ status: 404, description: 'Response not found'})
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('support', 'admin')
    @ApiConsumes('multipart/form-data')
    @Put(':responseId')
    async updateResponse(@Param('responseId') responseId: String, @Body() updateResponseDTO: UpdateResponseDTO){
        try{
            return await this.responseService.updateResponse(responseId, updateResponseDTO);
        } catch (error){
            throw new NotFoundException(error.message);
        }
    }

    @UseInterceptors(FileInterceptor('file'))
    @ApiOperation({summary: 'Delete response'})
    @ApiParam({ name: 'responseId', description: 'Response ID'})
    @ApiResponse({ status: 200, description: 'Response successfully deleted'})
    @ApiResponse({ status: 404, description: 'Response not found'})
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('support', 'admin')
    @ApiConsumes('multipart/form-data')
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':responseId')
    async deleteResponse(@Param('responseId') responseId: string){
        try{
            return await this.responseService.deleteResponse(responseId);
        } catch (error){
            throw new NotFoundException(error.message);
        }
    }
}
