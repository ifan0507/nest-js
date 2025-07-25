import { Category } from '@/category/entities/category.entity';
import { User } from '@/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToOne(() => Category, (category) => category.blog)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @ManyToOne(() => User, (author) => author.blog)
  @JoinColumn({ name: 'authorId' })
  author: User;
}
