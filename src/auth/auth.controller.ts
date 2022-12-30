import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { LoginDTO, RegisterDTO } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  tempAuth() {
    return { auth: 'works' };
  }

  @Post('login')
  async login(@Body() userDTO: LoginDTO) {
    const user = await this.userService.findByLogin(userDTO);
    const payload = {
      username: user.username
    };
    const token = await this.authService.signPayload(payload);
    return { user, token, statusCode: 200 };
  }
  @Post('register')
  async register(@Body() userDTO: RegisterDTO) {
    const user = await this.userService.create(userDTO);
    const payload = {
      username: user.username
    };
    const token = await this.authService.signPayload(payload);
    return { user, token };
  }
}
