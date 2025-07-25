import { IsNumber, IsString } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  categoryId: number;

  @IsNumber()
  authorId: number;
}
