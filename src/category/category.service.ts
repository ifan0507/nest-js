import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '@/category/entities/category.entity';
import { Repository } from 'typeorm';
import slugify from 'slugify';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const slug = slugify(createCategoryDto.name, { lower: true });
    const exitingSlug = await this.categoryRepository.findOne({
      where: { slug },
    });
    if (exitingSlug) {
      throw new ConflictException(
        `Category ${createCategoryDto.name} already exit `,
      );
    }

    const category = new Category();
    category.name = createCategoryDto.name;
    category.slug = slug;
    return this.categoryRepository.save(category);
  }

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async findOne(id: number): Promise<Category | null> {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return category;
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category | null> {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    if (updateCategoryDto.name) {
      const slug = slugify(updateCategoryDto.name, { lower: true });
      if (slug !== category.slug) {
        const exitingSlug = await this.categoryRepository.findOne({
          where: { slug },
        });
        if (exitingSlug) {
          throw new ConflictException(
            `Category ${updateCategoryDto.name} already exit `,
          );
        }
        category.slug = slug;
      }
      category.name = updateCategoryDto.name;
    }

    return this.categoryRepository.save(category);
  }

  async remove(id: number) {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return this.categoryRepository.delete({ id });
  }
}
