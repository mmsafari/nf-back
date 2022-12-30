import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI, {
      useFindAndModify: false
    }),
    MulterModule.register({
      dest: './uploads'
    })
  ],
  controllers: [UploadController],
  providers: [UploadService]
})
export class UsersModule {}
