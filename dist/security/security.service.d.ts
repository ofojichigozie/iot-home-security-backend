import { TriggerAlertDto } from './dto/trigger-alert.dto';
import { UserService } from 'src/user/user.service';
import { HistoryService } from 'src/history/history.service';
import { User } from 'src/user/interfaces/user.interface';
import { SMSService } from './sms.service';
export declare class SecurityService {
    private readonly userService;
    private readonly historyService;
    private readonly smsService;
    constructor(userService: UserService, historyService: HistoryService, smsService: SMSService);
    triggerAlert(triggerAlertDto: TriggerAlertDto): Promise<void>;
    checkAlerts(UUC: string): Promise<User>;
}
