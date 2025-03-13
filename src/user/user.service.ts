import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { UpdateUserDTO } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    async getAllUser(): Promise<User[]>{
        const users = await this.userModel.find().exec();
        return users;
    }

    async getUserById(userId: string): Promise<User>{
        const user = await this.userModel.findById(userId).exec();
        if(!user){
            throw new NotFoundException(`User with ID ${userId} not found`)
        }
        return user;
    }

    async createUser(username: String, surename: String, email: String, password: String): Promise<User>{
        const newUser = new this.userModel({username, surename, email, password});
        return newUser.save();
    }

    async findOne(email: string): Promise<User | undefined> {
        const user = await this.userModel.findOne({ email }).exec();
        return user || undefined;
    }

    async updateUser(userId: string, updateUserDTO: UpdateUserDTO): Promise<User>{
        if (updateUserDTO.password) {
            updateUserDTO.password = await bcrypt.hash(updateUserDTO.password, 10);
        }
        
        const updateUser = await this.userModel
        .findByIdAndUpdate(userId, updateUserDTO, {new: true}).exec();
        
        if(!updateUser){
            throw new NotFoundException(`User with ID ${userId} not found`)
        }
    
        return updateUser;
    } 

    async deleteUser(userId: string): Promise<{ message: string }>{
        const deleteUser = await this.userModel.findByIdAndDelete(userId).exec();

        if (!deleteUser) {
            throw new NotFoundException('User not found');
        }

        return {message: 'User deleted successfully'};
    }
}
