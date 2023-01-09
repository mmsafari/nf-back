import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { FieldsModule } from './fields/fields.module';
import { ProductModule } from './product/product.module';
import { UsersModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL, {
      dbName: 'wish_db'
    }),
    AuthModule,
    UsersModule,
    ProductModule,
    FieldsModule
  ]
})
export class AppModule {}
