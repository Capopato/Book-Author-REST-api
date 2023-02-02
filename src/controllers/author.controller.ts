import { Request, Response, NextFunction } from 'express';
import Author from '../models/author.model';
import mongoose from 'mongoose';

const healthcheck = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.sendStatus(200);
    } catch (error) {
        res.status(404).json({ error });
    }
};

const createAuthor = async (req: Request, res: Response, next: NextFunction) => {
    /** Curly brackets because it is an object from file Author2.model */
    const name = req.body.name;
    const age = req.body.age;

    /** declare a new author */
    const author = new Author({
        /** Give it a id with the mongoose function */
        _id: new mongoose.Types.ObjectId(),
        name,
        age
    });

    try {
        await author.save();
        res.status(201).json({ author });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const readAuthor = async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.params.authorId;

    try {
        const author = await Author.findById(authorId);
        res.status(200).json({ author });
    } catch (error) {
        res.status(400).json({ error });
    }
};

const readAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const all = await Author.find();
        res.status(200).json({ all });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const updateAuthor = async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.params.authorId;

    try {
        const update = await Author.findByIdAndUpdate(authorId);
        if (update) {
            update.set(req.body);
            update.save();
            res.status(200).json({ update });
        } else {
            res.status(500).send('The update could not be completed');
        }
    } catch (error) {
        res.status(404).json({ error }).send('Author not found');
    }
};

const deleteAuthor = async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.params.authorId;

    try {
        if (await Author.findByIdAndDelete(authorId)) {
            res.status(200).send('Delete successfull');
        } else {
            res.status(404).send('Cannot delete author. Author not found.');
            next();
        }
    } catch (error) {
        res.status(500).json({ error }).send('Cannot delete author. An error occured.');
    }
};

export default { healthcheck, createAuthor, readAuthor, readAll, updateAuthor, deleteAuthor };
