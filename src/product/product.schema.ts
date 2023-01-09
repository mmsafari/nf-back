import * as mongoose from 'mongoose';

export const ProductsSchema = new mongoose.Schema({
  name: String,
  ename: String,
  image: String,
  image_1: String,
  image_2: String,
  category_name: String,
  category_id: String,
  uniqueId: String,
  price: Number,
  details: Array,
  description: String,
  hasExist: Boolean,
  province: String,
  city: String,
  address: String,
  investment_period: String,
  rate: Number
});
