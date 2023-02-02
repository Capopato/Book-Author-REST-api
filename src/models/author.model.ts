/** This is the blueprint how the author data will be stored in the DB */
import mongoose, { Document, Schema } from 'mongoose';

export interface Author {
    name: String;
    age: number;
}

export interface AuthorModel extends Author, Document {}

const AuthorSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        age: { type: Number, required: true }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<AuthorModel>('Author', AuthorSchema);
