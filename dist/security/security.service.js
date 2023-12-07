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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const history_service_1 = require("../history/history.service");
const sms_service_1 = require("./sms.service");
let SecurityService = class SecurityService {
    constructor(userService, historyService, smsService) {
        this.userService = userService;
        this.historyService = historyService;
        this.smsService = smsService;
    }
    async triggerAlert(triggerAlertDto) {
        const user = await this.userService.findByUUC(triggerAlertDto.UUC);
        if (!user || user.PIN !== triggerAlertDto.PIN) {
            throw new common_1.BadRequestException('Invalid credentials');
        }
        const neighbours = await this.userService.findNeighbours(user._id, user.city, user.state, user.country);
        await this.userService.changeSecurityStatus(user._id, 'TENSED');
        const history = {
            user: user._id,
            type: 'alert',
            address: user.address,
            city: user.city,
            state: user.state,
            country: user.country,
        };
        await this.historyService.createHistory(history);
        const alertData = {
            fullName: `${user.firstName} ${user.lastName}`,
            location: `${user.address}, ${user.city}`,
        };
        this.smsService.alertNeighbours(alertData, neighbours);
        return { message: 'Successfully triggered alert!' };
    }
    async checkAlerts(UUC) {
        const user = await this.userService.findByUUC(UUC);
        if (!user) {
            throw new common_1.BadRequestException(`User with UUC, ${UUC} not found`);
        }
        const aTensedNeighbour = await this.userService.findATensedNeighbour(user._id, user.city, user.state, user.country);
        if (!aTensedNeighbour) {
            throw new common_1.NotFoundException('No neighbour has triggered an alert');
        }
        await this.userService.changeSecurityStatus(aTensedNeighbour._id, 'CALM');
        return aTensedNeighbour;
    }
};
exports.SecurityService = SecurityService;
exports.SecurityService = SecurityService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        history_service_1.HistoryService,
        sms_service_1.SMSService])
], SecurityService);
//# sourceMappingURL=security.service.js.map