/** Imports */
import config2 from './config/config';
import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import authorRoutes from './routes/author.routes';
import bookRoutes from './routes/book.routes';

const app = express();

/** Connect to mongoDB via mongoose */
mongoose
    .set('strictQuery', false)
    .connect(config2.mongoUrl)
    .then(() => {
        console.log('Connected to MongoDB');
        startServer();
    })
    .catch((error) => {
        console.log(error);
    });

/** Only start server if the connection to the db is successfull */
const startServer = () => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    /** Use the routes function for the routes */
    app.use('/author', authorRoutes);
    app.use('/book', bookRoutes);

    app.listen(config2.PORT, () => console.log(`Server is running at ${config2.PORT}`));
};
