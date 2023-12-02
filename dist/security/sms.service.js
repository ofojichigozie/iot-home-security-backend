"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SMSService = void 0;
const decorators_1 = require("@nestjs/common/decorators");
const axios_1 = require("axios");
let SMSService = class SMSService {
    async sendAlertSMS(data, receiver) {
        try {
            const message = `Security alert from ${data.fullName} with location, ${data.location}`;
            await axios_1.default.post('https://www.bulksmsnigeria.com/api/v2/sms', {
                body: message,
                from: 'SecureHome',
                to: receiver,
                api_token: '',
                gateway: 'direct-refund',
            }, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
        }
        catch (error) {
        }
    }
    async alertNeighbours(data, neighbours) {
        for (let i = 0; i < neighbours.length; i++) {
            await this.sendAlertSMS(data, neighbours[i].phoneNumber);
        }
    }
};
exports.SMSService = SMSService;
exports.SMSService = SMSService = __decorate([
    (0, decorators_1.Injectable)()
], SMSService);
//# sourceMappingURL=sms.service.js.map