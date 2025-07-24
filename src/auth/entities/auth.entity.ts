import { IsEmail } from 'class-validator';

export class Auth {
  @IsEmail()
  email: string;

  password: string;
}
