import express, { type Express } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userController from "./controller/user";
import cors from "cors";
dotenv.config()

const PORT = process.env.PORT;
const URI: any = process.env.URI;
export const secretKey = process.env.SECRET_KEY;



async function connectDB(URI: string) {
    try {
        await mongoose.connect(URI, {dbName: "User"});
        console.log(mongoose.connection.readyState)
    } catch (err) {
        console.log(err)
    }

}


const app: Express = express()

app.use(express.json());
app.use(cors());
app.use("/user", userController);

app.listen(PORT, async () => {
    await connectDB(URI);
    console.log(`Server is running on port ${PORT}`);
});