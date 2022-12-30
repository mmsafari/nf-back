import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { UserService } from 'src/user/user.service';

@Injectable({})
export class AuthService {
  constructor(private userService: UserService) {}

  //return a Token(JWT)
  async signPayload(payload: any) {
    return sign(payload, 'secretKey', { expiresIn: '365d' });
  }
  //check if a user exict with this payload(username)
  async validateUser(payload: any) {
    return await this.userService.findByPayload(payload);
  }
}
