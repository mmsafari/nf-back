import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  HttpStatus,
  NotFoundException,
  UseGuards,
  Delete,
  Put
} from '@nestjs/common';
import { FieldsService } from './fields.service';
import { CreateFieldsDTO } from './dto/create-fields.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('product')
export class FieldsController {
  constructor(private fieldsService: FieldsService) {}

  @Get()
  async getAllFields(@Res() res) {
    const data = await this.fieldsService.getAllFields();
    return res.status(HttpStatus.OK).json({ data, statusCode: 200 });
  }

  @Get('search/:name')
  async getFieldsSearch(@Res() res, @Param('name') name) {
    const data = await this.fieldsService.getFieldsSearch(name);
    if (!data) throw new NotFoundException('no product');
    return res.status(HttpStatus.OK).json({ statusCode: 200, data });
  }

  @Get('/:id')
  async getFields(@Res() res, @Param('id') id) {
    const data = await this.fieldsService.getFieldsById(id);
    if (!data) throw new NotFoundException('product does not exist!');
    return res.status(HttpStatus.OK).json({ data, statusCode: 200 });
  }

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  async createFields(@Res() res, @Body() createFieldsDTO: CreateFieldsDTO) {
    const data = await this.fieldsService.createFieldss(createFieldsDTO);
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      message: 'product added succefuly',
      data
    });
  }

  @Delete('/delete/:id')
  @UseGuards(AuthGuard('jwt'))
  async deleteCat(@Res() res, @Param('id') id) {
    const product = await this.fieldsService.deleteFields(id);
    if (!product) throw new NotFoundException('product does not exist');
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      message: 'product has been deleted',
      product
    });
  }

  @Put('/update/:id')
  async updateFields(@Res() res, @Param('id') id, @Body() createFieldsDTO: CreateFieldsDTO) {
    const data = await this.fieldsService.updateFields(id, createFieldsDTO);
    if (!data) throw new NotFoundException('data does not exist!');
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      message: 'data has been successfully updated',
      data
    });
  }
}
