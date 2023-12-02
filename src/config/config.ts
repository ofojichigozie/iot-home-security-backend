import { config } from "dotenv";

config();

export default {
    MONGODB_URL: process.env.MONGODB_CONNECTION_STRING,
    JWT_SECRET: process.env.JWT_SECRET
}