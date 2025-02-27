import { response } from 'express';
import * as mongoose from 'mongoose';
import { Types } from 'mongoose';

export const RequestSchema = new mongoose.Schema({
    requestNumber: Number,
    userId: { type: Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['open', 'in_progress', 'closed'], default: 'open' },
    problemDescription: String,
    responses: [{type: Types.ObjectId, ref: 'Response', required: false, default: []}],
    created_at: { type: Date, default: Date.now },
});