import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './../user/user.service';
import { RegisterDTO } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UserService
    ) {}

    async register(registerDTO: RegisterDTO){
        const existingUser = await this.userService.findOne(registerDTO.email);
        if(existingUser){
            throw new ConflictException('User already exists');
        }

        const hashedPassword = await bcrypt.hash(registerDTO.password, 10);
        const user = {
            ...registerDTO,
            password: hashedPassword,
        };

        await this.userService.createUser(user.username, user.surename, user.email, user.password);

        return this.generateToken(user);
    }

    async login(loginDTO: LoginDTO){
        const user = await this.userService.findOne(loginDTO.email);

        if(!user){
            throw new UnauthorizedException('Invalid credentials')
        }

        const isPasswordValid = await bcrypt.compare (
            loginDTO.password,
            user.password,
        );

        if(!isPasswordValid){
            throw new UnauthorizedException('Invalid credentials')
        }

        return this.generateToken(user);
    }

    private generateToken(user: any){
        const payload = {
            email: user.email,
            sub: user.id,
            role: user.role,
        };

        return { 
            access_token: this.jwtService.sign(payload),
        };
    }
}
