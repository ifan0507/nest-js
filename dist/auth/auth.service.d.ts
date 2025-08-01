import { UserService } from '@/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from '@/auth/dto/auth.dto';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    signIn(authDto: AuthDto): Promise<{
        access_token: string;
    }>;
}
