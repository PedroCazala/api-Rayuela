import mongoose from 'mongoose'
import { IUser } from '../interfaces/users.interface';
import bcrypt from 'bcryptjs';

export const userCollection = 'Users';

const UsersSchema = new mongoose.Schema <IUser>({
    lastModifiedDate:{type:Date},
    creationDate:{type:Date,required:true},
    email:{type:String,required:true,unique:true},
    password:{type: String,required:true},
    rol:{type: String, enum: ['user', 'admin'], require:true},
    cartId:{type:mongoose.Schema.Types.ObjectId},
    name: { type: String },
    lastName: { type: String },
    direction: {
        address: { type: String },
        city: { type: String },
        prov: { type: String },
        CP: { type: Number },
    },
    phone: { type: Number },
    img: { type: String },
    dateBird: { type: Date },

})
UsersSchema.pre('save',async function(next){
    const hash = await bcrypt.hash(this.password, 10)
    this.password=hash
    next()
})
UsersSchema.methods.IsValidPassword = async function (password:string) {
    const user = this
    const compare = await bcrypt.compare(password, user.password)
    return compare 
}

export const UserModel = mongoose.model<IUser>(userCollection,UsersSchema) 
