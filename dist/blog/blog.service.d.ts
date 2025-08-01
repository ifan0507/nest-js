import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Repository } from 'typeorm';
import { Blog } from '@/blog/entities/blog.entity';
export declare class BlogService {
    private readonly blogRepository;
    private readonly logger;
    constructor(blogRepository: Repository<Blog>);
    create(createBlogDto: CreateBlogDto): Promise<Blog>;
    findAll(): Promise<Blog[]>;
    findOne(id: number): Promise<Blog | null>;
    findByCategory(categorySlug: string): Promise<Blog[]>;
    update(id: number, updateBlogDto: UpdateBlogDto): Promise<Blog>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
