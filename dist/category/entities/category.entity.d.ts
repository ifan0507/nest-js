import { Blog } from '@/blog/entities/blog.entity';
export declare class Category {
    id: number;
    name: string;
    slug: string;
    blog: Blog[];
}
