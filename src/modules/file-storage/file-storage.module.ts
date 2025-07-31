import { Module } from '@nestjs/common';

import { FileStorageListener } from './listeners/file-storage.listener';
import { FILE_STORAGE_SERVICE } from './models/constants/file-storage.constants';
import { FileStorageService } from './services/file-storage.service';

@Module({
  providers: [
    { provide: FILE_STORAGE_SERVICE, useClass: FileStorageService },
    FileStorageListener,
  ],
  exports: [FILE_STORAGE_SERVICE],
})
export class FileStorageModule {}
