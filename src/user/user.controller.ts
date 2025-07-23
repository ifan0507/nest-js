import { CreateUserDto } from '@/user/dto/create.dto';
import { User } from '@/user/user.entity';
import { UserService } from '@/user/user.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create-user')
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('/:id')
  findOne(id: number): Promise<User | null> {
    return this.userService.findOne(id);
  }
}
