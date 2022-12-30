import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  getTest(): string {
    return 'Test is Ok';
  }
}
