import express from 'express';
import router from './author.routes';
import bookController from '../controllers/book.controller';
import { validateSchema, Schemas } from '../middleware/validateSchema';

const bookRoutes = express.Router();

bookRoutes.post('/create', validateSchema(Schemas.book.create), bookController.createBook);
bookRoutes.get('/read/:bookId', bookController.readBook);
bookRoutes.get('/all/', bookController.readAllBooks);
bookRoutes.put('/update/:bookId', validateSchema(Schemas.book.update), bookController.updateBook);
bookRoutes.delete('/delete/:bookId', bookController.deleteBook);
bookRoutes.delete('/delete-all', bookController.deleteAll);

export default bookRoutes;
