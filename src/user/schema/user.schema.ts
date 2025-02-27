import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    username: {type: String, require: true},
    surename: {type: String, require: true},
    email: {type: String, require: true},
    role: { type: String, enum: ['client', 'support', 'admin'], default: 'client' }, 
    password: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});