import { RoleGuard } from '@/auth/auth.guard';
import { Roles } from '@/auth/role.decorator';
import { UpdateUserDto } from '@/user/dto/update-user.dto';
import { UserDto } from '@/user/dto/user.dto';
import { User } from '@/user/entities/user.entity';
import { UserService } from '@/user/user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private readonly userService: UserService) {}

  @Post('/create-user')
  @Roles('admin')
  @UseInterceptors(
    FileInterceptor('foto', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  create(
    @Body() userDto: UserDto,
    @UploadedFile() foto: Express.Multer.File,
  ): Promise<User> {
    return this.userService.createUser(userDto, foto);
  }

  @Get()
  @Roles('admin')
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('/:id')
  @Roles('admin', 'user')
  findOne(id: number): Promise<User | null> {
    return this.userService.findOne(id);
  }

  @Patch('/edit/:id')
  @Roles('admin', 'user')
  @UseInterceptors(
    FileInterceptor('foto', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  updateUser(
    @Param('id') id: number,
    @Body() body: any,
    @UploadedFile() foto: Express.Multer.File,
  ): Promise<User | null> {
    this.logger.debug(
      `Update User controller yang ditemukan: ${JSON.stringify(body)}`,
    );
    return this.userService.updateUser(id, body, foto);
  }

  @Delete('/:id/delete')
  @Roles('admin')
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
