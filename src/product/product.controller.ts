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
import { ProductService } from './product.service';
import { CreateProductDTO } from './dto/create-product.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async getAllProduct(@Res() res) {
    const data = await this.productService.getAllProduct();
    return res.status(HttpStatus.OK).json({ data, statusCode: 200 });
  }

  @Get('/byCat/:id')
  async getProductByCat(@Res() res, @Param('id') id) {
    const productBySub = await this.productService.getProductByCat(id);
    if (!productBySub) throw new NotFoundException('no product');
    return res.status(HttpStatus.OK).json({ statusCode: 200, productBySub });
  }

  //   @Get('/byBrand/:id')
  //   async getProductByBrand(@Res() res, @Param('id') id) {
  //     const productBySub = await this.productService.getProductByBrand(id);
  //     if (!productBySub) throw new NotFoundException('no product');
  //     return res.status(HttpStatus.OK).json({ statusCode: 200, productBySub });
  //   }

  @Get('search/:name')
  async getProductSearch(@Res() res, @Param('name') name) {
    const data = await this.productService.getProductSearch(name);
    if (!data) throw new NotFoundException('no product');
    return res.status(HttpStatus.OK).json({ statusCode: 200, data });
  }

  @Get('/:id')
  async getProduct(@Res() res, @Param('id') id) {
    const data = await this.productService.getProductById(id);
    if (!data) throw new NotFoundException('product does not exist!');
    return res.status(HttpStatus.OK).json({ data, statusCode: 200 });
  }

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  async createProduct(@Res() res, @Body() createProductDTO: CreateProductDTO) {
    const data = await this.productService.createProducts(createProductDTO);
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      message: 'product added succefuly',
      data
    });
  }

  @Delete('/delete/:id')
  @UseGuards(AuthGuard('jwt'))
  async deleteCat(@Res() res, @Param('id') id) {
    const product = await this.productService.deleteProduct(id);
    if (!product) throw new NotFoundException('product does not exist');
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      message: 'product has been deleted',
      product
    });
  }

  @Put('/update/:id')
  async updateProduct(@Res() res, @Param('id') id, @Body() createProductDTO: CreateProductDTO) {
    const data = await this.productService.updateProduct(id, createProductDTO);
    if (!data) throw new NotFoundException('data does not exist!');
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      message: 'data has been successfully updated',
      data
    });
  }
}
