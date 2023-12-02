import { HistoryService } from './history.service';
import { History } from './interfaces/history.interface';
export declare class HistoryController {
    private readonly historyService;
    constructor(historyService: HistoryService);
    getUserHistories(userId: string): Promise<History[]>;
    getHistory(historyId: string): Promise<History>;
}
