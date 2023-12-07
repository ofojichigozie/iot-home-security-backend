"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistorySchema = void 0;
const mongoose = require("mongoose");
exports.HistorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    type: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
    },
});
//# sourceMappingURL=history.schema.js.map