"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let HistoryService = class HistoryService {
    constructor(HistoryModel) {
        this.HistoryModel = HistoryModel;
    }
    async createHistory(alertHistory) {
        const newHistory = new this.HistoryModel(alertHistory);
        return await newHistory.save();
    }
    async getUserHistories(userId) {
        return await this.HistoryModel.find({ user: userId });
    }
    async getHistory(alertHistoryId) {
        return await this.HistoryModel.findById(alertHistoryId).populate("user");
    }
    async deleteUserHistories(userId) {
        return await this.HistoryModel.deleteMany({ user: userId });
    }
    async deleteHistory(alertHistoryId) {
        return await this.HistoryModel.findByIdAndDelete(alertHistoryId);
    }
};
exports.HistoryService = HistoryService;
exports.HistoryService = HistoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('History')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], HistoryService);
//# sourceMappingURL=history.service.js.map