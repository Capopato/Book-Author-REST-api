"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controller_1 = __importDefault(require("../controllers/book.controller"));
const validateSchema_1 = require("../middleware/validateSchema");
const bookRoutes = express_1.default.Router();
bookRoutes.post('/create', (0, validateSchema_1.validateSchema)(validateSchema_1.Schemas.book.create), book_controller_1.default.createBook);
bookRoutes.get('/read/:bookId', book_controller_1.default.readBook);
bookRoutes.get('/all/', book_controller_1.default.readAllBooks);
bookRoutes.put('/update/:bookId', (0, validateSchema_1.validateSchema)(validateSchema_1.Schemas.book.update), book_controller_1.default.updateBook);
bookRoutes.delete('/delete/:bookId', book_controller_1.default.deleteBook);
bookRoutes.delete('/delete-all', book_controller_1.default.deleteAll);
exports.default = bookRoutes;
