import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<import("../user/interfaces/user.interface").User>;
    login(loginDto: LoginDto): Promise<{
        user: import("../user/interfaces/user.interface").User;
        accessToken: string;
    }>;
}
