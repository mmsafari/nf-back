import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Fields } from './fields.interface';
import { CreateFieldsDTO } from './dto/create-fields.dto';

@Injectable()
export class FieldsService {
  constructor(
    @InjectModel('Fields')
    private readonly FieldsModel: Model<Fields>
  ) {}

  async getAllFields(): Promise<Fields[]> {
    const data = await this.FieldsModel.find().exec();
    return data;
  }

  async getFieldsSearch(name): Promise<Fields[]> {
    const temp = await this.FieldsModel.find().exec();
    const product = [];
    temp.forEach(element => {
      if (element.name.includes(name)) {
        product.push(element);
      }
    });
    return product;
  }

  async createFieldss(createFieldsDTO: CreateFieldsDTO): Promise<Fields> {
    const newFields = await new this.FieldsModel(createFieldsDTO);
    return newFields.save();
  }

  async getFieldsById(id): Promise<Fields> {
    const data = await this.FieldsModel.findById(id).exec();
    return data;
  }

  async deleteFields(id): Promise<any> {
    const product = await this.FieldsModel.findByIdAndRemove(id);
    return product;
  }

  async updateFields(id, createFieldsDTO: CreateFieldsDTO): Promise<Fields> {
    const data = await this.FieldsModel.findByIdAndUpdate(id, createFieldsDTO, { new: true });

    return data;
  }
}
