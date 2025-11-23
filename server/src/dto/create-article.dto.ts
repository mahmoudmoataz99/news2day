import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  author: string;

  @IsEmail()
  email: string;

  @IsString()
  category: string;

  @IsOptional()
  @IsString()
  image?: string;
}
