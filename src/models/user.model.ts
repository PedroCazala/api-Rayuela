import mongoose from 'mongoose'
import { IUser } from '../interfaces/users.interface';

export const userCollection = 'Users';

const UsersSchema = new mongoose.Schema <IUser>({
    _id: {type:String,required:true},
    // userId:  [{ type: mongoose.Types.ObjectId, ref: usersCollection, required:true }]
    creationDate:{type:Date, required:true},
    lastModifiedDate:{type:Date},

})

export const UserModel = mongoose.model<IUser>(userCollection,UsersSchema) 
