import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        const MONGO_DB_URI = "mongodb://localhost:27017/cricketAuction";
        await mongoose.connect(MONGO_DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Mongo DB Connected");
    } catch (error) {
        console.error("DB Connection Error: ", error);
        process.exit(1);
    }
};


export default connectDB;