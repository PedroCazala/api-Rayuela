import mongoose from "mongoose";

export const connectMongoDb = () => {
    try {
        mongoose.connect(
            /* `mongodb+srv://pedro:${process.env.MONGO_PASSWORD}@cluster0.tugf9.mongodb.net/rayu?retryWrites=true&w=majority`  ||  */ `mongodb://localhost:27017/rayu`,
        ).then(()=>console.log(`Se conectó a mongoDB 🔥`)
        )
    } catch (error) {
        console.log(error);
    }
};
