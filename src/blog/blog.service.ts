import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from '@/blog/entities/blog.entity';
import { Category } from '@/category/entities/category.entity';
import { User } from '@/user/entities/user.entity';
import slugify from 'slugify';

@Injectable()
export class BlogService {
  private readonly logger = new Logger(BlogService.name);
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
  ) {}

  async create(createBlogDto: CreateBlogDto) {
    try {
      const slug = slugify(createBlogDto.title, { lower: true });
      const exitingSlug = await this.blogRepository.findOne({
        where: { slug },
      });
      if (exitingSlug) {
        throw new ConflictException(
          `Title with ${createBlogDto.title} alredy exit`,
        );
      }

      const blog = new Blog();
      blog.title = createBlogDto.title;
      blog.slug = slug;
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

  async findAll(): Promise<Blog[]> {
    return await this.blogRepository.find({
      relations: ['category', 'author'],
    });
  }

  async findOne(id: number): Promise<Blog | null> {
    const blog = await this.blogRepository.findOne({
      where: { id },
      relations: ['category', 'author'],
    });
    if (!blog) {
      throw new NotFoundException(`Blog with id ${id} not found`);
    }
    return blog;
  }

  async findByCategory(categorySlug: string): Promise<Blog[]> {
    // this.logger.debug(
    //   `Create blog yang ditemukan: ${JSON.stringify(categorySlug)}`,
    // );
    return this.blogRepository
      .createQueryBuilder('blog')
      .leftJoinAndSelect('blog.category', 'category')
      .leftJoinAndSelect('blog.author', 'author')
      .where('category.slug = :categorySlug', { categorySlug })
      .getMany();
  }

  async update(id: number, updateBlogDto: UpdateBlogDto) {
    const blog = await this.blogRepository.findOneBy({ id });
    if (!blog) {
      throw new NotFoundException(`Blog with id ${id} not found`);
    }

    if (updateBlogDto.title) {
      const slug = slugify(updateBlogDto.title, { lower: true });
      if (slug !== blog.slug) {
        const exitingSlug = await this.blogRepository.findOne({
          where: { slug },
        });
        if (exitingSlug) {
          throw new ConflictException(
            `Title with ${updateBlogDto.title} alredy exit`,
          );
        }
        blog.slug = slug;
        blog.title = updateBlogDto.title;
      }
    }

    Object.assign(blog, updateBlogDto);
    return this.blogRepository.save(blog);
  }

  async remove(id: number) {
    await this.blogRepository.delete({ id });
    return { message: 'Delete blog successfully' };
  }
}
