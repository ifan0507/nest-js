import { Category } from '@/category/entities/category.entity';
import { User } from '@/user/entities/user.entity';
export declare class Blog {
    id: number;
    title: string;
    slug: string;
    description: string;
    category: Category;
    author: User;
}
