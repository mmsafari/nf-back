import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  signin() {
    return {
      success: true,
      msg: 'signed in',
      Token: 'eyJhbGciOiJSUzI1NiIsImtpZ....',
    };
  }
  signup() {
    return {
      success: true,
      msg: 'signed up',
      Token: 'eyJhbGciOiJSUzI1NiIsImtpZ....',
    };
  }
}

const service = new AuthService();
