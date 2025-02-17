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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let UserService = class UserService {
    constructor(UserModel) {
        this.UserModel = UserModel;
    }
    async create(createUserDto) {
        const existingUser = await this.UserModel.findOne({
            phoneNumber: createUserDto.phoneNumber,
        });
        if (existingUser) {
            throw new common_1.BadRequestException('User with phone number already exist');
        }
        const newUser = new this.UserModel(createUserDto);
        return await newUser.save();
    }
    async findAll() {
        return await this.UserModel.find();
    }
    async findOne(id) {
        return await this.UserModel.findById(id);
    }
    async findByPhoneNumber(phoneNumber) {
        return await this.UserModel.findOne({ phoneNumber });
    }
    async findByUUC(UUC) {
        return await this.UserModel.findOne({ UUC });
    }
    async findNeighbours(id, city, state, country) {
        let neighbours = await this.UserModel.find({
            city,
            state,
            country,
            _id: { $ne: id },
        });
        return neighbours;
    }
    async findATensedNeighbour(id, city, state, country) {
        let tensedNeighbours = await this.UserModel.find({
            city,
            state,
            country,
            securityStatus: 'TENSED',
        });
        tensedNeighbours = tensedNeighbours.filter((neighbour) => neighbour._id !== id);
        return tensedNeighbours[0] || null;
    }
    async changeSecurityStatus(id, securityStatus) {
        return await this.UserModel.findByIdAndUpdate(id, { securityStatus }, {
            new: true,
        });
    }
    async update(id, requester, updateUserDto) {
        if (id !== requester.userId) {
            throw new common_1.UnauthorizedException('Users can only update their own profile');
        }
        return await this.UserModel.findByIdAndUpdate(id, updateUserDto, {
            new: true,
        });
    }
    async delete(id, requester) {
        if (id !== requester.userId) {
            throw new common_1.UnauthorizedException('Users can only delete their own profile');
        }
        return await this.UserModel.findByIdAndDelete(id);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], UserService);
//# sourceMappingURL=user.service.js.map