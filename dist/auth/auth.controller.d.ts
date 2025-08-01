import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    private readonly logger;
    create(authDto: AuthDto): Promise<{
        access_token: string;
    }>;
}
