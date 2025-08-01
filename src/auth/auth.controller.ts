import { Controller, Post, Body, Logger, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Public } from '@/auth/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  private readonly logger = new Logger(AuthController.name);
  @Public()
  @Post('/signin')
  create(@Body() authDto: AuthDto) {
    this.logger.debug(`api jalan)}`);
    return this.authService.signIn(authDto);
  }
  @Public()
  @Get('/hello')
  api() {
    return 'hello';
  }
}
