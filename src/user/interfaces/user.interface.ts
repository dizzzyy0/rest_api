import {Document} from 'mongoose';

export interface User extends Document{
    readonly username: String;
    readonly surename: string; 
    readonly email: string;
    readonly role: 'client' | 'support' | 'admin'; 
    readonly password: string;
    readonly created_at: Date;
};