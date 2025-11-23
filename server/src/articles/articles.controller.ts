import { Controller, Get, Post, Delete, Param, Body, UseGuards, Query } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from '../dto/create-article.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  findAll(@Query('category') category?: string, @Query('author') author?: string, @Query('email') email?: string) {
    if (category) {
      return this.articlesService.findByCategory(category);
    }
    if (author) {
      return this.articlesService.findByAuthor(author);
    }
    if (email) {
      return this.articlesService.findByEmail(email);
    }
    return this.articlesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.articlesService.remove(id);
  }
}
