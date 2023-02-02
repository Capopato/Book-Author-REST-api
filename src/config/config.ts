/** Dotenv makes sure the data from the .env file is imported.read */
import dotenv from 'dotenv';

dotenv.config();

const mongoUsername = process.env.MONGO_USERNAME || '';
const mongoPassword = process.env.MONGO_PASSWORD || '';
const mongoUrl = process.env.MONGO_URL || '';
const PORT = process.env.PORT || 3000;

export default {
    mongoUsername,
    mongoPassword,
    mongoUrl,
    PORT
};
