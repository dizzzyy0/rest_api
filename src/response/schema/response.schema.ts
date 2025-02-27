import * as mongoose from 'mongoose';
import { Types } from 'mongoose';

export const ResponseSchema = new mongoose.Schema({
    requestId:{ type: Types.ObjectId, ref: 'Request', required: true },
    userId: { type: Types.ObjectId, ref: 'User', required: true },
    responseText: { type: String, require: true},
    created_at: { type: Date, default: Date.now },
});