import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<User> {
    return await this.userService.create(registerDto);
  }

  async login(
    loginDto: LoginDto,
  ): Promise<{ user: User; accessToken: string }> {
    const user: User = await this.userService.findByPhoneNumber(
      loginDto.phoneNumber,
    );
    if (!user) {
      throw new NotFoundException(
        `User with phone number, ${loginDto.phoneNumber} doesn't exist`,
      );
    }

    if (user.PIN !== loginDto.PIN) {
      throw new UnauthorizedException(`Incorrect PIN`);
    }

    const payload = { userId: user._id, phoneNumber: user.phoneNumber };
    const accessToken = await this.jwtService.signAsync(payload);
    return { user, accessToken };
  }
}
