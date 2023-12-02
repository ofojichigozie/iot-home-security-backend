"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.default = {
    MONGODB_URL: process.env.MONGODB_CONNECTION_STRING,
    JWT_SECRET: process.env.JWT_SECRET
};
//# sourceMappingURL=config.js.map