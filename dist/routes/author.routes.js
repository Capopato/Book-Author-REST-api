"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const author_controller_1 = __importDefault(require("../controllers/author.controller"));
const validateSchema_1 = require("../middleware/validateSchema");
const authorRoutes = express_1.default.Router();
authorRoutes.get('/healthcheck', author_controller_1.default.healthcheck);
authorRoutes.post('/create', (0, validateSchema_1.validateSchema)(validateSchema_1.Schemas.author.create), author_controller_1.default.createAuthor);
authorRoutes.get('/read/:authorId', author_controller_1.default.readAuthor);
authorRoutes.get('/all', author_controller_1.default.readAll);
authorRoutes.put('/update/:authorId', (0, validateSchema_1.validateSchema)(validateSchema_1.Schemas.author.update), author_controller_1.default.updateAuthor);
authorRoutes.delete('/delete/:authorId', author_controller_1.default.deleteAuthor);
exports.default = authorRoutes;
