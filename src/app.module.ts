import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import config from './config/config';
import { UserModule } from './user/user.module';
import { SecurityModule } from './security/security.module';
import { HistoryModule } from './history/history.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(config.MONGODB_URL),
    UserModule,
    SecurityModule,
    HistoryModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
