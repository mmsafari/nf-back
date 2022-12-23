import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  signin() {
    const numberD = 5;
    return {
      success: true,
      msg: 'signed in',
      Token: `there is a ${numberD}`
    };
  }
  signup() {
    return {
      success: true,
      msg: 'signed up',
      Token: 'eyJhbGciOiJSUzI1NiIsImtpZ....'
    };
  }
}

const service = new AuthService();
