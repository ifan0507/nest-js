import { Blog } from '@/blog/entities/blog.entity';
import { Role } from '@/user/entities/role';
export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    foto: string;
    role: Role;
    blog: Blog[];
}
