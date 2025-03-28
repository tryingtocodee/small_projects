"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Url = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const urlSchema = new mongoose_1.default.Schema({
    originalUrl: {
        type: String,
        required: true,
        unique: true,
    },
    shortUrlId: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User"
    },
    expiredAt: {
        type: Date,
        default: null
    },
    clickCount: {
        type: Number,
        default: 0
    },
    clickHistory: [{
            clickedAt: { type: Date, default: Date.now },
            ipAddress: { type: String },
            location: {
                city: { type: String },
                country: { type: String }
            }
        }]
}, { timestamps: true });
exports.Url = mongoose_1.default.model("Url", urlSchema);
