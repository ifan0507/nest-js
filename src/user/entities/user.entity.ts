import { Role } from '@/user/entities/role';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  foto: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;
}
