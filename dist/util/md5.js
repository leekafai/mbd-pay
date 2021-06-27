"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const string_1 = __importDefault(require("./string"));
const makeMD5 = (str) => {
    if (!string_1.default.notEmpty(str)) {
        throw new Error('string invalid');
    }
    return crypto_1.default.createHash('MD5').update(str).digest('hex');
};
exports.default = makeMD5;
