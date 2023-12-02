import { Module } from '@nestjs/common';
import { SecurityService } from './security.service';
import { SecurityController } from './security.controller';
import { UserModule } from 'src/user/user.module';
import { HistoryModule } from 'src/history/history.module';
import { SMSService } from './sms.service';

@Module({
  imports: [UserModule, HistoryModule],
  controllers: [SecurityController],
  providers: [SecurityService, SMSService],
})
export class SecurityModule {}
