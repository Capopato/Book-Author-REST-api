import express from 'express';
import controller from '../controllers/author.controller';
import { validateSchema, Schemas } from '../middleware/validateSchema';
const authorRoutes = express.Router();

authorRoutes.get('/healthcheck', controller.healthcheck);
authorRoutes.post('/create', validateSchema(Schemas.author.create), controller.createAuthor);
authorRoutes.get('/read/:authorId', controller.readAuthor);
authorRoutes.get('/all', controller.readAll);
authorRoutes.put('/update/:authorId', validateSchema(Schemas.author.update), controller.updateAuthor);
authorRoutes.delete('/delete/:authorId', controller.deleteAuthor);

export default authorRoutes;
