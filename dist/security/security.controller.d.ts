import { SecurityService } from './security.service';
import { TriggerAlertDto } from './dto/trigger-alert.dto';
export declare class SecurityController {
    private readonly securityService;
    constructor(securityService: SecurityService);
    triggerAlert(triggerAlertDto: TriggerAlertDto): Promise<void>;
    checkAlerts(UUC: string): Promise<import("../user/interfaces/user.interface").User>;
}
