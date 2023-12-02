import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';
import { HistorySchema } from './schemas/history.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: 'History',
        useFactory: () => {
          const schema = HistorySchema;
          schema.pre('save', function () {
            this.createdAt = new Date();
          });
          return schema;
        },
      },
    ]),
  ],
  controllers: [HistoryController],
  providers: [HistoryService],
  exports: [HistoryService],
})
export class HistoryModule {}
