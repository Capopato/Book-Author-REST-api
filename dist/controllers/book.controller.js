"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const book_model_1 = __importDefault(require("../models/book.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const createBook = (req, res, next) => {
    const book = new book_model_1.default({
        id: new mongoose_1.default.Types.ObjectId(),
        title: req.body.title,
        pages: req.body.pages,
        year: req.body.year,
        author: req.body.author
    });
    try {
        book.save();
        res.status(200).json({ book });
    }
    catch (error) {
        return res.status(500).send('Something went wrong.').json({ error });
    }
};
const readBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const bookId = req.params.bookId;
    // return Book.findById(bookId)
    //     .populate('author')
    //     .then((book) => (book ? res.status(200).json({ book }) : res.status(404).json({ message: 'not found' })))
    //     .catch((error) => res.status(500).json({ error }));
    const bookId = req.params.bookId;
    try {
        const book = yield book_model_1.default.findById(bookId).populate('author');
        res.status(200).json({ book });
    }
    catch (error) {
        return res.status(500).send('Something went wrong.').json({ error });
    }
});
const readAllBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const all = yield book_model_1.default.find().populate('author');
        res.status(200).json({ all });
    }
    catch (error) {
        res.status(500).send('Something went wrong');
    }
});
const updateBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    try {
        const update = yield book_model_1.default.findByIdAndUpdate(bookId);
        if (update)
            update.set(req.body);
        res.status(200).json({ update });
    }
    catch (error) {
        res.status(500).send('Something went wrong');
    }
});
const deleteBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    try {
        const deleteBook = yield book_model_1.default.findById(bookId);
        if (deleteBook)
            deleteBook.delete();
        res.status(200).json({ deleteBook });
    }
    catch (error) {
        res.status(500).send('Something went wrong');
    }
});
const deleteAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const all = book_model_1.default.find();
    try {
        yield all.deleteMany();
        res.status(200).send('All books are deleted');
    }
    catch (error) {
        res.status(500).send('Could not perform delete action.');
    }
});
exports.default = { createBook, readBook, readAllBooks, updateBook, deleteBook, deleteAll };
