import {
  Controller,
  Get,
  Res,
  HttpStatus,
  UseGuards,
  Param,
  NotFoundException,
  Delete,
  Put,
  Body,
  Post
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { RegisterDTO } from '../auth/auth.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAllUsers(@Res() res) {
    const data = await this.userService.getAllUser();
    return res.status(HttpStatus.OK).json({ data, statusCode: 200 });
  }

  @Delete('/delete/:id')
  @UseGuards(AuthGuard('jwt'))
  async deleteCat(@Res() res, @Param('id') id) {
    const user = await this.userService.deleteUser(id);
    if (!user) throw new NotFoundException('user does not exist');
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      message: 'user has been deleted',
      user
    });
  }
  @Post()
  async createUser(@Body() createUserDto: RegisterDTO): Promise<any> {
    return this.userService.create(createUserDto);
  }
  @Put('/update/:id')
  async updateProduct(@Res() res, @Param('id') id, @Body() registerDTO: RegisterDTO) {
    const data = await this.userService.updateUser(id, registerDTO);
    if (!data) throw new NotFoundException('data does not exist!');
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      message: 'data has been successfully updated',
      data
    });
  }
}
