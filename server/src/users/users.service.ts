import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { Article } from '../schemas/article.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Article.name) private articleModel: Model<Article>,
  ) {}

  async findAll() {
    const users = await this.userModel.find().select('-Password').exec();
    return { success: true, message: 'Users fetched successfully', data: users };
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id).select('-Password').exec();
    if (!user) throw new NotFoundException('User not found');
    return { success: true, message: 'User fetched successfully', data: user };
  }

  async getProfile(id: string) {
    const user = await this.userModel.findById(id).select('-Password').exec();
    if (!user) throw new NotFoundException('User not found');

    const articles = await this.articleModel.find({ email: user.email }).sort({ publishedAt: -1 }).exec();

    const profileData = {
      user: {
        _id: user._id,
        firstName: user.First_Name,
        lastName: user.Last_Name,
        email: user.email,
        lastLogin: user.Last_Login,
      },
      articles: articles.map(article => ({
        _id: article._id,
        title: article.title,
        content: article.content,
        category: article.category,
        image: article.image,
        publishedAt: article.publishedAt,
      })),
      totalArticles: articles.length,
    };

    return { success: true, message: 'User profile fetched successfully', data: profileData };
  }

  async update(id: string, updates: any) {
    const mappedUpdates: any = {};
    
    if (updates.firstName !== undefined) mappedUpdates.First_Name = updates.firstName;
    if (updates.lastName !== undefined) mappedUpdates.Last_Name = updates.lastName;
    if (updates.email !== undefined) mappedUpdates.email = updates.email;
    if (updates.Password !== undefined) mappedUpdates.Password = updates.Password;
    
    const updatedUser = await this.userModel.findByIdAndUpdate(id, mappedUpdates, { new: true }).select('-Password').exec();
    if (!updatedUser) throw new NotFoundException('User not found');
    return { success: true, message: 'User updated successfully', data: updatedUser };
  }

  async remove(id: string) {
    const user = await this.userModel.findByIdAndDelete(id).exec();
    if (!user) throw new NotFoundException('User not found');
    return { success: true, message: 'User deleted successfully', data: user };
  }
}