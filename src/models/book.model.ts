/** This is the blueprint how the book data will be stored in the DB */
import mongoose, { Document, Schema } from 'mongoose';

export interface BookModel extends Document {
    title: String;
    pages: Number;
    year: Number;
    author: Schema;
}

const bookSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        pages: { type: Number, required: true },
        year: { type: Number, required: true },
        author: { type: Schema.Types.ObjectId, required: true, ref: 'Author' }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<BookModel>('Book', bookSchema);
