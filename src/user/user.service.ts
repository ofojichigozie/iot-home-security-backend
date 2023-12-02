import {
  BadRequestException,
  UnauthorizedException,
  Injectable,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly UserModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.UserModel.findOne({
      phoneNumber: createUserDto.phoneNumber,
    });
    if (existingUser) {
      throw new BadRequestException('User with phone number already exist');
    }
    const newUser = new this.UserModel(createUserDto);
    return await newUser.save();
  }

  async findAll(): Promise<User[]> {
    return await this.UserModel.find();
  }

  async findOne(id: string): Promise<User> {
    return await this.UserModel.findById(id);
  }

  async findByPhoneNumber(phoneNumber: string): Promise<User> {
    return await this.UserModel.findOne({ phoneNumber });
  }

  async findByUUC(UUC: string): Promise<User> {
    return await this.UserModel.findOne({ UUC });
  }

  async findNeighbours(
    id: string,
    city: string,
    state: string,
    country: string,
  ): Promise<User[]> {
    let neighbours: User[] = await this.UserModel.find({
      city,
      state,
      country,
    });
    neighbours = neighbours.filter((neighbour) => neighbour._id !== id);
    return neighbours;
  }

  async findATensedNeighbour(
    id: string,
    city: string,
    state: string,
    country: string,
  ): Promise<User> {
    let tensedNeighbours: User[] = await this.UserModel.find({
      city,
      state,
      country,
      securityStatus: 'TENSED',
    });
    tensedNeighbours = tensedNeighbours.filter(
      (neighbour) => neighbour._id !== id,
    );
    return tensedNeighbours[0] || null;
  }

  async changeSecurityStatus(
    id: string,
    securityStatus: 'CALM' | 'TENSED',
  ): Promise<User> {
    return await this.UserModel.findByIdAndUpdate(
      id,
      { securityStatus },
      {
        new: true,
      },
    );
  }

  async update(
    id: string,
    requester: Record<string, any>,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    if (id !== requester.userId) {
      throw new UnauthorizedException(
        'Users can only update their own profile',
      );
    }
    return await this.UserModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
  }

  async delete(
    id: string,
    requester: Record<string, any>,
  ): Promise<User | any> {
    if (id !== requester.userId) {
      throw new UnauthorizedException(
        'Users can only delete their own profile',
      );
    }
    return await this.UserModel.findByIdAndDelete(id);
  }
}
