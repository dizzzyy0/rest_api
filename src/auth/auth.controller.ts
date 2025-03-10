import { Body, Controller, Get, Post, Req, UnauthorizedException, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { JwtAuthGuard } from './jwt.auth-guard';

@ApiTags('Authentication')
@ApiBearerAuth('JWT-auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

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

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async getCurrentUser(@Req() req) {
        const user = await this.userService.findOne(req.user.email);
        if (!user) {
            throw new UnauthorizedException('User not found');
        }
        return user;
    }
}
