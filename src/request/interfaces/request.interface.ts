import mongoose, {Document, Types} from 'mongoose';
import { User } from 'src/user/interfaces/user.interface';
import { RequestSchema } from '../schema/request.schema';

export interface Request extends Document{
    readonly requestNumber: number; 
    readonly userId: Types.ObjectId | User; 
    readonly status: 'open' | 'in_progress' | 'closed'; 
    readonly problemDescription: string; 
    responses?: Types.ObjectId[];
    readonly created_at: Date;
};

RequestSchema.pre('save', async function(next) {
    if (this.isNew && (this.requestNumber === undefined || this.requestNumber === null)) {
      try {
        const maxRequestDoc = await mongoose.model<Request>('Request')
          .findOne({}, { requestNumber: 1 })
          .sort({ requestNumber: -1 })
          .limit(1);
  
        const nextNumber = maxRequestDoc ? maxRequestDoc.requestNumber + 1 : 1;
        this.requestNumber = nextNumber;
      } catch (error) {
        return next(error);
      }
    }
    next();
  });
  