import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  Logger,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Controller('blog')
export class BlogController {
  private logger = new Logger();
  constructor(private readonly blogService: BlogService) {}

  @Post()
  create(@Body(new ValidationPipe()) createBlogDto: CreateBlogDto) {
    return this.blogService.create(createBlogDto);
  }

  @Get()
  findAll() {
    return this.blogService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: number) {
    return this.blogService.findOne(+id);
  }

  @Get('/category/:categorySlug')
  findByCategory(@Param('categorySlug') categorySlug: string) {
    // this.logger.debug(
    //   `Create blog yang ditemukan: ${JSON.stringify(categorySlug)}`,
    // );
    return this.blogService.findByCategory(categorySlug);
  }

  @Patch('/:id/edit')
  update(
    @Param('id') id: number,
    @Body(new ValidationPipe()) updateBlogDto: UpdateBlogDto,
  ) {
    return this.blogService.update(+id, updateBlogDto);
  }

  @Delete('/:id/delete')
  remove(@Param('id') id: number) {
    return this.blogService.remove(+id);
  }
}
