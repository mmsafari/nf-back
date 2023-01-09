import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsSchema } from './product.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Products', schema: ProductsSchema }])],
  providers: [ProductService],
  controllers: [ProductController]
})
export class ProductModule {}
