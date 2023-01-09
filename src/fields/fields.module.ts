import { Module } from '@nestjs/common';
import { FieldsService } from './fields.service';
import { FieldsController } from './fields.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FieldsSchema } from './fields.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Fields', schema: FieldsSchema }])],
  providers: [FieldsService],
  controllers: [FieldsController]
})
export class FieldsModule {}
