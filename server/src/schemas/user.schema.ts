import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  First_Name: string;

  @Prop({ required: true })
  Last_Name: string;

  @Prop({ required: true })
  Password: string;

  @Prop({ required: true, match: /\S+@\S+\.\S+/ })
  email: string;

  @Prop()
  Last_Login: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
