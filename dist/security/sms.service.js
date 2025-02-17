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
const querystring_1 = require("querystring");
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
    async sendAlertSMSV2(data, receivers) {
        const username = 'ofojichigozie@gmail.com';
        const password = 'pointech@sms92';
        const sender = 'SecureHomes';
        const message = `Security alert from ${data.fullName} with location, ${data.location}`;
        const mobiles = receivers.join(",");
        const apiUrl = 'https://portal.nigeriabulksms.com/api';
        const smsOptions = {
            username,
            password,
            sender,
            message,
            mobiles,
        };
        try {
            const response = await axios_1.default.get(`${apiUrl}?${(0, querystring_1.stringify)(smsOptions)}`);
        }
        catch (error) {
        }
    }
    async alertNeighbours(victimData, neighboursPhoneNumbers) {
        for (let i = 0; i < neighboursPhoneNumbers.length; i++) {
            await this.sendAlertSMS(victimData, neighboursPhoneNumbers[i]);
        }
    }
    async alertNeighboursV2(victimData, neighboursPhoneNumbers) {
        await this.sendAlertSMSV2(victimData, neighboursPhoneNumbers);
    }
};
exports.SMSService = SMSService;
exports.SMSService = SMSService = __decorate([
    (0, decorators_1.Injectable)()
], SMSService);
//# sourceMappingURL=sms.service.js.map