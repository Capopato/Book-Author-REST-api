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
const author_model_1 = __importDefault(require("../models/author.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const healthcheck = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.sendStatus(200);
    }
    catch (error) {
        res.status(404).json({ error });
    }
});
const createAuthor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    /** Curly brackets because it is an object from file Author2.model */
    const name = req.body.name;
    const age = req.body.age;
    /** declare a new author */
    const author = new author_model_1.default({
        /** Give it a id with the mongoose function */
        _id: new mongoose_1.default.Types.ObjectId(),
        name,
        age
    });
    try {
        yield author.save();
        res.status(201).json({ author });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
const readAuthor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authorId = req.params.authorId;
    try {
        const author = yield author_model_1.default.findById(authorId);
        res.status(200).json({ author });
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
const readAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const all = yield author_model_1.default.find();
        res.status(200).json({ all });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
const updateAuthor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authorId = req.params.authorId;
    try {
        const update = yield author_model_1.default.findByIdAndUpdate(authorId);
        if (update) {
            update.set(req.body);
            update.save();
            res.status(200).json({ update });
        }
        else {
            res.status(500).send('The update could not be completed');
        }
    }
    catch (error) {
        res.status(404).json({ error }).send('Author not found');
    }
});
const deleteAuthor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authorId = req.params.authorId;
    try {
        if (yield author_model_1.default.findByIdAndDelete(authorId)) {
            res.status(200).send('Delete successfull');
        }
        else {
            res.status(404).send('Cannot delete author. Author not found.');
            next();
        }
    }
    catch (error) {
        res.status(500).json({ error }).send('Cannot delete author. An error occured.');
    }
});
exports.default = { healthcheck, createAuthor, readAuthor, readAll, updateAuthor, deleteAuthor };
