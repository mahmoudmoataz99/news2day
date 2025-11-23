import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from '../schemas/article.schema';
import { CreateArticleDto } from '../dto/create-article.dto';

@Injectable()
export class ArticlesService {
  constructor(@InjectModel(Article.name) private articleModel: Model<Article>) { }

  async findAll() {
    const articles = await this.articleModel.find().sort({ publishedAt: -1 }).exec();
    return articles;
  }

  async findByCategory(category: string) {
    const articles = await this.articleModel
      .find({ category: { $regex: category, $options: 'i' } })
      .sort({ publishedAt: -1 })
      .exec();
    return articles;
  }

  async findByAuthor(author: string) {
    const articles = await this.articleModel
      .find({ author: { $regex: author, $options: 'i' } })
      .sort({ publishedAt: -1 })
      .exec();
    return articles;
  }

  async findByEmail(email: string) {
    const articles = await this.articleModel
      .find({ email: email })
      .sort({ publishedAt: -1 })
      .exec();
    return articles;
  }

  async findOne(id: string) {
    const article = await this.articleModel.findById(id).exec();
    if (!article) throw new NotFoundException('Article not found');
    return article;
  }

  async create(createArticleDto: CreateArticleDto) {
    const newArticle = new this.articleModel({
      ...createArticleDto,
      publishedAt: new Date(),
    });
    const savedArticle = await newArticle.save();
    return {
      success: true,
      message: 'Article created successfully',
      data: savedArticle,
    };
  }

  async remove(id: string) {
    const article = await this.articleModel.findByIdAndDelete(id).exec();
    if (!article) throw new NotFoundException('Article not found');
    return article;
  }
}
