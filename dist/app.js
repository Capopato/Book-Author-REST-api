"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/** Imports */
const config_1 = __importDefault(require("./config/config"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const author_routes_1 = __importDefault(require("./routes/author.routes"));
const book_routes_1 = __importDefault(require("./routes/book.routes"));
const app = (0, express_1.default)();
/** Connect to mongoDB via mongoose */
mongoose_1.default
    .set('strictQuery', false)
    .connect(config_1.default.mongoUrl)
    .then(() => {
    console.log('Connected to MongoDB');
    startServer();
})
    .catch((error) => {
    console.log(error);
});
/** Only start server if the connection to the db is successfull */
const startServer = () => {
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    /** Use the routes function for the routes */
    app.use('/author', author_routes_1.default);
    app.use('/book', book_routes_1.default);
    app.listen(config_1.default.PORT, () => console.log(`Server is running at ${config_1.default.PORT}`));
};
