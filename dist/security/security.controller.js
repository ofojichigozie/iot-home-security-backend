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
exports.SecurityController = void 0;
const common_1 = require("@nestjs/common");
const security_service_1 = require("./security.service");
const trigger_alert_dto_1 = require("./dto/trigger-alert.dto");
let SecurityController = class SecurityController {
    constructor(securityService) {
        this.securityService = securityService;
    }
    triggerAlert(triggerAlertDto) {
        return this.securityService.triggerAlert(triggerAlertDto);
    }
    checkAlerts(UUC) {
        return this.securityService.checkAlerts(UUC);
    }
};
exports.SecurityController = SecurityController;
__decorate([
    (0, common_1.Post)('trigger-alert'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [trigger_alert_dto_1.TriggerAlertDto]),
    __metadata("design:returntype", void 0)
], SecurityController.prototype, "triggerAlert", null);
__decorate([
    (0, common_1.Get)('check-alerts/:UUC'),
    __param(0, (0, common_1.Param)('UUC')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SecurityController.prototype, "checkAlerts", null);
exports.SecurityController = SecurityController = __decorate([
    (0, common_1.Controller)('security'),
    __metadata("design:paramtypes", [security_service_1.SecurityService])
], SecurityController);
//# sourceMappingURL=security.controller.js.map