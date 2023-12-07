import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TriggerAlertDto } from './dto/trigger-alert.dto';
import { UserService } from 'src/user/user.service';
import { HistoryService } from 'src/history/history.service';
import { User } from 'src/user/interfaces/user.interface';
import { SMSService } from './sms.service';

@Injectable()
export class SecurityService {
  constructor(
    private readonly userService: UserService,
    private readonly historyService: HistoryService,
    private readonly smsService: SMSService,
  ) {}

  async triggerAlert(
    triggerAlertDto: TriggerAlertDto,
  ): Promise<{ message: string }> {
    const user = await this.userService.findByUUC(triggerAlertDto.UUC);
    if (!user || user.PIN !== triggerAlertDto.PIN) {
      throw new BadRequestException('Invalid credentials');
    }

    const neighbours = await this.userService.findNeighbours(
      user._id,
      user.city,
      user.state,
      user.country,
    );

    await this.userService.changeSecurityStatus(user._id, 'TENSED');

    const history = {
      userId: user._id,
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

  async checkAlerts(UUC: string): Promise<User> {
    const user = await this.userService.findByUUC(UUC);
    if (!user) {
      throw new BadRequestException(`User with UUC, ${UUC} not found`);
    }

    const aTensedNeighbour = await this.userService.findATensedNeighbour(
      user._id,
      user.city,
      user.state,
      user.country,
    );

    if (!aTensedNeighbour) {
      throw new NotFoundException('No neighbour has triggered an alert');
    }

    await this.userService.changeSecurityStatus(aTensedNeighbour._id, 'CALM');
    return aTensedNeighbour;
  }
}
