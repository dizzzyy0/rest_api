import {Document, Types} from 'mongoose';
import { User } from 'src/user/interfaces/user.interface';

export interface Response extends Document{
    readonly requestId: Types.ObjectId | Request;
    readonly userId: Types.ObjectId | User; 
    readonly responseText: String;
    readonly created_at: Date;
};