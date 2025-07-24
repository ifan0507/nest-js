import { UserDto } from '@/user/dto/user.dto';
import { User } from '@/user/entities/user.entity';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(userDto: UserDto, foto: Express.Multer.File): Promise<User> {
    const user = new User();
    user.name = userDto.name;
    user.email = userDto.email;
    user.password = await bcrypt.hash(userDto.password, 20);
    user.foto = foto?.filename;
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.userRepository.findOneBy({ email });
    return user ?? null;
  }

  async findOne(id: number): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async updateUser(
    id: number,
    updateUserDto: any,
    foto: Express.Multer.File,
  ): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with id ${id} nout found`);
    }

    if (updateUserDto.password) {
      user.password = await bcrypt.hash(updateUserDto.password, 20);
    }

    // this.logger.debug(`Update User yang ditemukan: ${JSON.stringify(foto)}`);
    if (foto) {
      if (user.foto) {
        const filePath = path.join(__dirname, '..', '..', 'uploads', user.foto);
        try {
          fs.unlinkSync(filePath);
        } catch (error) {
          throw new Error(error);
        }
      }
      user.foto = foto?.filename;
    }

    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async deleteUser(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with id ${id} nout found`);
    }

    if (user.foto) {
      const filePath = path.join(__dirname, '..', '..', 'uploads', user.foto);
      try {
        fs.unlinkSync(filePath);
      } catch (error) {
        throw new Error(error);
      }
    }

    await this.userRepository.delete({ id });
    return { message: 'Delete user successfully' };
  }
}
