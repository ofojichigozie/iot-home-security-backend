import { Injectable } from '@nestjs/common/decorators';
import { stringify } from 'querystring';
import axios from 'axios';

@Injectable()
export class SMSService {
  private async sendAlertSMS(data, receiver) {
    try {
      const message = `Security alert from ${data.fullName} with location, ${data.location}`;

      await axios.post(
        'https://www.bulksmsnigeria.com/api/v2/sms',
        {
          body: message,
          from: 'SecureHome',
          to: receiver,
          api_token: '',
          gateway: 'direct-refund',
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
    } catch (error) {
      // DO NOTHING
    }
  }

  private async sendAlertSMSV2(data, receivers: string[]) {
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
      const response = await axios.get(
        `${apiUrl}?${stringify(smsOptions)}`,
      );
    } catch (error) {
      // DO NOTHING
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
}
