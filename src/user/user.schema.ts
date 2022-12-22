import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop()
  userId: string;

  @Prop()
  email: string;

  @Prop()
  age: number;

  @Prop([String])
  favoriteFoods: string[];
}
export const UserSchema = SchemaFactory.createForClass(User);
