import joi, { ObjectSchema } from 'joi';
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { Author } from '../models/author.model';
import { BookModel } from '../models/book.model';

/** Validate schema function.]
 * This is to validate the incoming data from a POST request so that the DB doesn't get compromised
 */
export const validateSchema = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);
        } catch (error) {
            console.log(error);
            res.status(422).json({ error });
        }
    };
};

/** Per POST request define the validation */
export const Schemas = {
    author: {
        create: Joi.object<Author>({
            name: Joi.string().required(),
            age: Joi.number().required()
        }),
        update: Joi.object<Author>({
            name: Joi.string().required(),
            age: Joi.number().required()
        })
    },
    book: {
        create: Joi.object<BookModel>({
            title: Joi.string().required(),
            pages: Joi.number().required(),
            year: Joi.number().required(),
            author: Joi.string().required()
        }),
        update: Joi.object<BookModel>({
            title: Joi.string().required(),
            pages: Joi.number().required(),
            year: Joi.number().required(),
            author: Joi.string().required()
        })
    }
};
