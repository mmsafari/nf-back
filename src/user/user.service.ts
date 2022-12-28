import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.dto';
import { LoginDTO, RegisterDTO } from '../auth/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  private sanitizeUser(user: User) {
    return user.depopulate('password');
  }

  async getAllUser(): Promise<User[]> {
    const data = await this.userModel.find().exec();
    return data;
  }

  async deleteUser(id): Promise<any> {
    const user = await this.userModel.findByIdAndRemove(id);
    return user;
  }
  //create newUser with a userModel
  async create(userDTO: RegisterDTO) {
    const { username } = userDTO;
    //check if user exist
    const user = await this.userModel.findOne({ username });
    if (user) {
      throw new HttpException('User already Exist', HttpStatus.BAD_REQUEST);
    }
    //create user in DB
    const createdUser = new this.userModel(userDTO);
    await createdUser.save();
    return this.sanitizeUser(createdUser);
  }

  async findByLogin(userDTO: LoginDTO) {
    const { username, password } = userDTO;
    const user = await this.userModel.findOne({ username });
    if (!user) {
      throw new HttpException('User does not Exist', HttpStatus.UNAUTHORIZED);
    }
    if (await bcrypt.compare(password, user.password)) {
      return this.sanitizeUser(user);
    } else {
      throw new HttpException('Invalid Credential', HttpStatus.UNAUTHORIZED);
    }
  }

  async findByPayload(payload: any) {
    const { username } = payload;
    return await this.userModel.findOne({ username });
  }
  //update user Data
  async updateUser(id, userDTO: RegisterDTO): Promise<User> {
    const data = await this.userModel.findByIdAndUpdate(id, userDTO, { new: true });
    return data;
  }
}
