import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SecurityService } from './security.service';
import { TriggerAlertDto } from './dto/trigger-alert.dto';

@Controller('security')
export class SecurityController {
  constructor(private readonly securityService: SecurityService) {}

  @Post('trigger-alert')
  triggerAlert(@Body() triggerAlertDto: TriggerAlertDto) {
    return this.securityService.triggerAlert(triggerAlertDto);
  }

  @Get('check-alerts/:UUC')
  checkAlerts(@Param('UUC') UUC: string) {
    return this.securityService.checkAlerts(UUC);
  }
}
