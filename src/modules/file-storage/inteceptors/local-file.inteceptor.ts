import {
  Inject,
  Injectable,
  NestInterceptor,
  UnsupportedMediaTypeException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { FILE_STORAGE_SERVICE } from '../models/constants/file-storage.constants';
import { FileStorageServiceInterface } from '../models/interfaces/file-storage-service.interface';

@Injectable()
export class LocalFileInterceptor implements NestInterceptor {
  constructor(
    @Inject(FILE_STORAGE_SERVICE)
    private readonly fileStorageService: FileStorageServiceInterface,
  ) {}
  intercept(...args: Parameters<NestInterceptor['intercept']>) {
    const fileInterceptor = new (FileInterceptor('file', {
      storage: this.fileStorageService.getStorage(),
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return callback(
            new UnsupportedMediaTypeException('Mimetype is not valid'),
            true,
          );
        }

        return callback(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
    }))();

    return fileInterceptor.intercept(...args);
  }
}
