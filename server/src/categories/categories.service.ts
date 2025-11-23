import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from '../schemas/category.schema';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) {}

  async findAll() {
    const categories = await this.categoryModel.find().exec();
    return categories.sort((a, b) => a.Name.localeCompare(b.Name));
  }

  async findOne(name: string) {
    const category = await this.categoryModel.findOne({ Name: name }).exec();
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }
}
