import { diskStorage } from 'multer';
import { Controller, Get, UseInterceptors, UploadedFile, UploadedFiles, Post, Param, Res } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { editFileName, imageFileFilter } from './uploads/upload.utils';
import { UploadService } from './upload.service';

@Controller()
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Get()
  getTest(): string {
    return this.uploadService.getTest();
  }
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName
      }),
      fileFilter: imageFileFilter
    })
  )
  async uploadedFile(@UploadedFile() file) {
    const response = {
      statusCode: 200,
      originalname: file.originalname,
      filename: file.filename
    };
    return response;
  }
  @Post('multiple')
  @UseInterceptors(
    FilesInterceptor('image', 20, {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName
      }),
      fileFilter: imageFileFilter
    })
  )
  async uploadMultipleFiles(@UploadedFiles() files) {
    const response = [];
    files.forEach(file => {
      const fileReponse = {
        originalname: file.originalname,
        filename: file.filename
      };
      response.push(fileReponse);
    });
    return response;
  }

  @Get('upload/:imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './uploads' });
  }
}
