import { Document } from 'mongoose';

export interface User extends Document {
  username: string;
  f_name: string;
  l_name: string;
  readonly password: string;
  image: string;
}
