import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
export declare class BlogController {
    private readonly blogService;
    private logger;
    constructor(blogService: BlogService);
    create(createBlogDto: CreateBlogDto): Promise<import("./entities/blog.entity").Blog>;
    findAll(): Promise<import("./entities/blog.entity").Blog[]>;
    findOne(id: number): Promise<import("./entities/blog.entity").Blog | null>;
    findByCategory(categorySlug: string): Promise<import("./entities/blog.entity").Blog[]>;
    update(id: number, updateBlogDto: UpdateBlogDto): Promise<import("./entities/blog.entity").Blog>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
