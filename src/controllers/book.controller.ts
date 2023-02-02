import { Request, Response, NextFunction } from 'express';
import Book from '../models/book.model';
import mongoose from 'mongoose';

const createBook = (req: Request, res: Response, next: NextFunction) => {
    const book = new Book({
        id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        pages: req.body.pages,
        year: req.body.year,
        author: req.body.author
    });

    try {
        book.save();
        res.status(200).json({ book });
    } catch (error) {
        return res.status(500).send('Something went wrong.').json({ error });
    }
};

const readBook = async (req: Request, res: Response, next: NextFunction) => {
    // const bookId = req.params.bookId;

    // return Book.findById(bookId)
    //     .populate('author')
    //     .then((book) => (book ? res.status(200).json({ book }) : res.status(404).json({ message: 'not found' })))
    //     .catch((error) => res.status(500).json({ error }));
    const bookId = req.params.bookId;

    try {
        const book = await Book.findById(bookId).populate('author');
        res.status(200).json({ book });
    } catch (error) {
        return res.status(500).send('Something went wrong.').json({ error });
    }
};
const readAllBooks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const all = await Book.find().populate('author');
        res.status(200).json({ all });
    } catch (error) {
        res.status(500).send('Something went wrong');
    }
};
const updateBook = async (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;

    try {
        const update = await Book.findByIdAndUpdate(bookId);
        if (update) update.set(req.body);
        res.status(200).json({ update });
    } catch (error) {
        res.status(500).send('Something went wrong');
    }
};
const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;

    try {
        const deleteBook = await Book.findById(bookId);
        if (deleteBook) deleteBook.delete();
        res.status(200).json({ deleteBook });
    } catch (error) {
        res.status(500).send('Something went wrong');
    }
};

const deleteAll = async (req: Request, res: Response, next: NextFunction) => {
    const all = Book.find();

    try {
        await all.deleteMany();
        res.status(200).send('All books are deleted');
    } catch (error) {
        res.status(500).send('Could not perform delete action.');
    }
};

export default { createBook, readBook, readAllBooks, updateBook, deleteBook, deleteAll };
