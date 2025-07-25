import { PartialType } from '@nestjs/mapped-types';
import { CreateBlogDto } from './create-blog.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateBlogDto extends PartialType(CreateBlogDto) {
  @IsString()
  @IsOptional()
  title?: string | undefined;

  @IsString()
  @IsOptional()
  description?: string | undefined;

  @IsNumber()
  @IsOptional()
  categoryId?: number | undefined;

  @IsNumber()
  @IsOptional()
  authorId?: number | undefined;
}
