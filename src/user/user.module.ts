import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
// import { UserController } from './user.controller';
// import { UserService } from '../shared/user.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])]
  //   controllers: [UserController],
  //   providers: [UserService],
})
export class UserModule {}
