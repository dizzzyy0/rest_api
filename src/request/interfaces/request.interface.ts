import {Document, Types} from 'mongoose';
import { User } from 'src/user/interfaces/user.interface';

export interface Request extends Document{
    readonly requestNumber: Number;
    readonly userId: Types.ObjectId | User; 
    readonly status: 'open' | 'in_progress' | 'closed'; 
    readonly problemDescription: String;
    responses?: Types.ObjectId[];
    readonly created_at: Date;

};