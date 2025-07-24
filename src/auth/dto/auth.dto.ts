import { IsEmail } from 'class-validator';

export class AuthDto {
  @IsEmail()
  email: string;

  password: string;
}
