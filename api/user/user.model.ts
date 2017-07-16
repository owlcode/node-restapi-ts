import mongoose = require('mongoose');

export interface IUser extends mongoose.Document {
    name: string;
    surname: string;
    username: string,
    photo: string,
    birth: Date,
    status: number;
    id: string;
    phone: string;
    mail: string
}

const UserSchema = new mongoose.Schema({
    name: String,
    surname: String,
    username: String,
    photo: String,
    birth: Date,
    status: Number,
    id: String,
    phone: String,
    mail: String // todo: change to mail - declare special mongoose type
},{
    timestamps :true
});

const User = mongoose.model<IUser>('User', UserSchema);
export default User;