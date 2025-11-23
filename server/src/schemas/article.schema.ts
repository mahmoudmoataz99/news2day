import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Article extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true, match: /\S+@\S+\.\S+/ })
  email: string;

  @Prop({ required: true })
  category: string;

  @Prop({ default: 'https://media.istockphoto.com/id/1369150014/vector/breaking-news-with-world-map-background-vector.jpg?s=612x612&w=0&k=20&c=9pR2-nDBhb7cOvvZU_VdgkMmPJXrBQ4rB1AkTXxRIKM=' })
  image: string;

  @Prop()
  publishedAt: Date;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
