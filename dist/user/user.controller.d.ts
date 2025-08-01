import { UserDto } from '@/user/dto/user.dto';
import { User } from '@/user/entities/user.entity';
import { UserService } from '@/user/user.service';
export declare class UserController {
    private readonly userService;
    private readonly logger;
    constructor(userService: UserService);
    create(userDto: UserDto, foto: Express.Multer.File): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User | null>;
    updateUser(id: number, body: any, foto: Express.Multer.File): Promise<User | null>;
    deleteUser(id: number): Promise<{
        message: string;
    }>;
}
