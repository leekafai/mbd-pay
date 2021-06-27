"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notEmpty = (str) => {
    return (typeof str === 'string') && str.length > 0;
};
exports.default = { notEmpty };
