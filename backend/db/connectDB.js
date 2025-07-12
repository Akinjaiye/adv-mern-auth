import mongoose from 'mongoose';

export const connectDB = async () =>{
    try {
        console.log("mongo_url: ", process.env.MONGO_URI);
        // const conn = await mongoose.connect(process.env.MONGO_URI);
        const conn = await mongoose.connect('mongodb+srv://akindijijaiyejaiye:S5GQxWiqzhxO8HVX@advanced-auth.tljqnyi.mongodb.net/advanced-auth?retryWrites=true&w=majority&appName=advanced-auth');

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log("Error connection to mongoDB ", error.message )
        process.exit(1);
    }
}