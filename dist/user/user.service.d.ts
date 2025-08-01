import { UserDto } from '@/user/dto/user.dto';
import { User } from '@/user/entities/user.entity';
import { Repository } from 'typeorm';
export declare class UserService {
    private readonly userRepository;
    private readonly logger;
    constructor(userRepository: Repository<User>);
    createUser(userDto: UserDto, foto: Express.Multer.File): Promise<User>;
    findAll(): Promise<User[]>;
    findByEmail(email: string): Promise<User | null>;
    findOne(id: number): Promise<User | null>;
    updateUser(id: number, updateUserDto: any, foto: Express.Multer.File): Promise<User | null>;
    deleteUser(id: number): Promise<{
        message: string;
    }>;
}
