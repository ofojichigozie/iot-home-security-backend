import { Controller, Get, Delete, Param } from '@nestjs/common';
import { HistoryService } from './history.service';
import { History } from './interfaces/history.interface';

@Controller('histories')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get(':userId')
  async getUserHistories(@Param('userId') userId: string): Promise<History[]> {
    return this.historyService.getUserHistories(userId);
  }

  @Get(':historyId')
  async getHistory(@Param('historyId') historyId: string): Promise<History> {
    return this.historyService.getHistory(historyId);
  }
}
