"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/** Dotenv makes sure the data from the .env file is imported.read */
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoUsername = process.env.MONGO_USERNAME || '';
const mongoPassword = process.env.MONGO_PASSWORD || '';
const mongoUrl = process.env.MONGO_URL || '';
const PORT = process.env.PORT || 3000;
exports.default = {
    mongoUsername,
    mongoPassword,
    mongoUrl,
    PORT
};
