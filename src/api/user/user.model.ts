import * as mongoose from 'mongoose';
import {isEmail} from 'validator';

export interface IUser extends mongoose.Document {
    mail: string;
    firstName?: string;
    lastName?: string;
    userName: string;
    password: string;
    spot: string;
    photo?: string;
    phone?: string;
}

const UserSchema = new mongoose.Schema({
    mail: {type: String, validate: [isEmail, 'Błedny adres mail.'], required: true},
    firstName: String,
    lastName: String,
    userName: {type: String, required: true},
    photo: String,
    password: {type: String, required: true},
    spot: {type: String, default: null},
    phone: String
}, {
    timestamps: true
});

export const User = mongoose.model<IUser>('User', UserSchema);