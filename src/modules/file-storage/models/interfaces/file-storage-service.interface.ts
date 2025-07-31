import { StorageEngine } from 'multer';

export interface FileStorageServiceInterface {
  getStorage(): StorageEngine;
  save(
    file: Express.Multer.File,
    userId: number,
    itemId: number,
  ): Promise<string>;
  delete(filePath: string): Promise<void>;
  deletePortfolioFolder(userId: number, portfolio: number): Promise<void>;
  deleteUserFolder(userId: number): Promise<void>;
  exists(filePath: string): Promise<void>;
}
