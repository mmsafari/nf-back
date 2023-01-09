import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Products } from './product.interface';
import { CreateProductDTO } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Products')
    private readonly ProductsModel: Model<Products>
  ) {}

  async getAllProduct(): Promise<Products[]> {
    const data = await this.ProductsModel.find().exec();
    return data;
  }

  async getProductByCat(id): Promise<Products[]> {
    const productCatId = await this.ProductsModel.find({ category_id: id });
    return productCatId;
  }

  //   async getProductByBrand(id): Promise<Products[]> {
  //     const productCatId = await this.ProductsModel.find({ brand_id: id });
  //     return productCatId;
  //   }

  async getProductSearch(name): Promise<Products[]> {
    const temp = await this.ProductsModel.find().exec();
    const product = [];
    temp.forEach(element => {
      if (element.name.includes(name)) {
        product.push(element);
      }
    });
    return product;
  }

  async createProducts(createProductDTO: CreateProductDTO): Promise<Products> {
    const newProduct = await new this.ProductsModel(createProductDTO);
    return newProduct.save();
  }

  async getProductById(id): Promise<Products> {
    const data = await this.ProductsModel.findById(id).exec();
    return data;
  }

  async deleteProduct(id): Promise<any> {
    const product = await this.ProductsModel.findByIdAndRemove(id);
    return product;
  }

  async updateProduct(id, createProductDTO: CreateProductDTO): Promise<Products> {
    const data = await this.ProductsModel.findByIdAndUpdate(id, createProductDTO, { new: true });

    return data;
  }
}
