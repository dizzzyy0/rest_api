import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseInterceptors(AnyFilesInterceptor())
    @ApiOperation({ summary: 'Registration' })
    @ApiResponse({ status: 200, description: 'Successfully registration'})
    @ApiResponse({ status: 400, description: 'Invalid data'})
    @ApiConsumes('multipart/form-data')
    @Post('register')
    async register(@Body() registerDTO: RegisterDTO){
        return this.authService.register(registerDTO);
    }

    @UseInterceptors(AnyFilesInterceptor())
    @ApiOperation({ summary: 'Login' })
    @ApiResponse({ status: 200, description: 'Successfully authenticated'})
    @ApiResponse({ status: 400, description: 'Invalid data'})
    @ApiConsumes('multipart/form-data')
    @Post('login')
    async login(@Body() loginDTO: LoginDTO){
        return this.authService.login(loginDTO);
    }
}
