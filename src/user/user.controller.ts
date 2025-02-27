import { 
    Controller, Get, Res, HttpStatus, Post, Body, Put, Query, NotFoundException, Delete, Param, 
    HttpCode,
    UseInterceptors,
    UseGuards
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDTO } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags, ApiBearerAuth, ApiConsumes, ApiParam } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt.auth-guard';
import { RolesGuard } from 'src/auth/role-decorator/roles.guard';
import { Roles } from 'src/auth/role-decorator/role.decorator';

@ApiTags('User Management')
@Controller('user')
@ApiBearerAuth('JWT-auth')
export class UserController {
    constructor(private userService: UserService) {}

    @UseInterceptors(FileInterceptor('file'))
    @ApiOperation({ summary: 'Get all Users'})
    @ApiResponse({
        status: 200,
        description: 'User list successfully retrieved'
    })
    @ApiConsumes('multipart/form-data')
    @Get()
    async getAllUsers() {
        return this.userService.getAllUser();
    }

    @UseInterceptors(FileInterceptor('file'))
    @ApiParam({ name: 'userId', description: 'User ID' })
    @ApiOperation({ summary: 'Get users by ID'})
    @ApiResponse({ status: 200, description: 'User successfully found' })
    @ApiResponse({ status: 404, description: 'User not found' })
    @ApiConsumes('multipart/form-data')
    @Get(':userId')
    async getUser(@Param('userId') userId: string) {
        try{
            return await this.userService.getUserById(userId);
        } catch (error){
            throw new NotFoundException(error.message);
        }
    }

    @UseInterceptors(FileInterceptor('file'))
    @ApiParam({ name: 'userId', description: 'User ID' })
    @ApiOperation({ summary: 'Updating information about user'})
    @ApiResponse({ status: 200, description: 'User successfully updated' })
    @ApiResponse({ status: 404, description: 'User not found' })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @ApiConsumes('multipart/form-data')
    @Put(':userId')
    async updateUser(@Param('userId') userId: string, @Body() updateUserDTO: UpdateUserDTO) {
        try{
            return await this.userService.updateUser(userId, updateUserDTO);
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    @ApiOperation({ summary: 'Delete a user' })
    @UseInterceptors(FileInterceptor('file'))
    @ApiParam({ name: 'userId', description: 'User ID' })
    @ApiResponse({ status: 204, description: 'User successfully deleted' })
    @ApiResponse({ status: 404, description: 'User not found' })
    @ApiConsumes('multipart/form-data')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':userId')
    async deleteUser(@Param('userId') userId: string) {
        try{
            return await this.userService.deleteUser(userId);
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }
}
