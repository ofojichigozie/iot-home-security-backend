import { Injectable } from '@nestjs/common/decorators';
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

  async alertNeighbours(data, neighbours) {
    for (let i = 0; i < neighbours.length; i++) {
      await this.sendAlertSMS(data, neighbours[i].phoneNumber);
    }
  }
}
