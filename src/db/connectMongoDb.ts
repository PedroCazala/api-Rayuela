import mongoose from "mongoose"

const options:object ={
    useNewUrlParser: true,
    useUnifiedTopology: true
}
export const connectMongoDb = ()=>{
    try {
        mongoose.connect(`mongodb+srv://pedro:${process.env.MONGO_PASSWORD}@cluster0.tugf9.mongodb.net/rayuela?retryWrites=true&w=majority` /* || `mongodb://localhost:27017/proyectoFinal` */,
        options,()=>console.log(`MongoDb is connected`)
        )
    } catch (error) {
        console.log(error);
    }
}
