import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from '@/blog/entities/blog.entity';
import { Category } from '@/category/entities/category.entity';
import { User } from '@/user/entities/user.entity';

@Injectable()
export class BlogService {
  private readonly logger = new Logger(BlogService.name);
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
  ) {}

  async create(createBlogDto: CreateBlogDto) {
    this.logger.debug(
      `Create blog yang ditemukan: ${JSON.stringify(createBlogDto)}`,
    );
    try {
      const blog = new Blog();
      blog.title = createBlogDto.title;
      blog.description = createBlogDto.description;
      blog.category = { id: createBlogDto.categoryId } as Category;
      blog.author = { id: createBlogDto.authorId } as User;
      const blogSave = await this.blogRepository.save(blog);
      if (!blogSave) {
        throw new BadRequestException('Something bad happened', {
          cause: new Error(),
          description: 'Some error description',
        });
      }
      return blogSave;
    } catch (error) {
      throw new InternalServerErrorException('Internal server error', {
        cause: new Error(),
        description: `Internal server error ${error}`,
      });
    }
  }

  findAll() {
    return `This action returns all blog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} blog`;
  }

  update(id: number, updateBlogDto: UpdateBlogDto) {
    return `This action updates a #${id} blog`;
  }

  remove(id: number) {
    return `This action removes a #${id} blog`;
  }
}
