import { IsEmail, IsString } from 'class-validator';

export class SignupDto {
  @IsString()
  First_Name: string;

  @IsString()
  Last_Name: string;

  @IsEmail()
  email: string;

  @IsString()
  Password: string;
}
