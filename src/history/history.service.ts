import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { History } from './interfaces/history.interface';

@Injectable()
export class HistoryService {
  constructor(
    @InjectModel('History')
    private readonly HistoryModel: Model<History>,
  ) {}

  async createHistory(alertHistory: History): Promise<History> {
    const newHistory = new this.HistoryModel(alertHistory);
    return await newHistory.save();
  }

  async getUserHistories(userId: string): Promise<History[]> {
    return await this.HistoryModel.find({ user: userId });
  }

  async getHistory(alertHistoryId: string): Promise<History> {
    return await this.HistoryModel.findById(alertHistoryId).populate("user");
  }

  async deleteUserHistories(userId: string): Promise<any> {
    return await this.HistoryModel.deleteMany({ user: userId });
  }

  async deleteHistory(alertHistoryId: string): Promise<any> {
    return await this.HistoryModel.findByIdAndDelete(alertHistoryId);
  }
}
