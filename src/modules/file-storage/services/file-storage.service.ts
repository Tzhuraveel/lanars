import { randomUUID } from 'node:crypto';
import * as fs from 'node:fs';
import * as fsPromise from 'node:fs/promises';
import * as path from 'node:path';
import { pipeline } from 'node:stream';
import { promisify } from 'node:util';

import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { diskStorage, StorageEngine } from 'multer';

import { STORAGE_DIR } from '../models/constants/file-storage.constants';
import { FileStorageServiceInterface } from '../models/interfaces/file-storage-service.interface';

const pump = promisify(pipeline);

@Injectable()
export class FileStorageService
  implements FileStorageServiceInterface, OnModuleInit
{
  getStorage(): StorageEngine {
    return diskStorage({
      filename: (req, file, cb) => {
        const extension = path.extname(file.originalname);
        const fileName = `${randomUUID()}${extension}`;
        cb(null, fileName);
      },
    });
  }

  async onModuleInit() {
    const uploadPath = path.join(process.cwd(), STORAGE_DIR);

    try {
      await fsPromise.access(uploadPath);
    } catch {
      await fsPromise.mkdir(uploadPath);
    }
  }

  async save(
    file: Express.Multer.File,
    userId: number,
    portfolioId: number,
  ): Promise<string> {
    const relativePath = this.buildRelativePath(
      userId,
      portfolioId,
      file.filename,
    );
    const absolutePath = this.buildAbsolutePath(relativePath);

    const dir = path.dirname(absolutePath);
    await fsPromise.mkdir(dir, { recursive: true });

    const readableStream = fs.createReadStream(file.path);
    const writeStream = fs.createWriteStream(absolutePath);
    await pump(readableStream, writeStream);

    return relativePath;
  }

  async delete(fileName: string): Promise<void> {
    const absolutePath = this.buildAbsolutePath(fileName);
    await fs.promises.unlink(absolutePath);
  }

  private async deleteFolder(relativePath: string): Promise<void> {
    const absolutePath = path.join(process.cwd(), relativePath);

    try {
      await this.exists(absolutePath);
      await fsPromise.rm(absolutePath, { recursive: true });
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code !== 'ENOENT') {
        throw err;
      }
    }
  }

  async deletePortfolioFolder(
    userId: number,
    portfolioId: number,
  ): Promise<void> {
    const folderPath = path.join(
      STORAGE_DIR,
      userId.toString(),
      portfolioId.toString(),
    );
    await this.deleteFolder(folderPath);
  }

  async deleteUserFolder(userId: number): Promise<void> {
    const folderPath = path.join(STORAGE_DIR, userId.toString());
    await this.deleteFolder(folderPath);
  }

  async exists(path: string): Promise<void> {
    try {
      await fsPromise.access(path);
    } catch {
      throw new NotFoundException('File not found');
    }
  }

  private buildAbsolutePath(fileName: string): string {
    return path.join(process.cwd(), STORAGE_DIR, fileName);
  }

  private buildRelativePath(
    userId: number,
    portfolioId: number,
    fileName: string,
  ): string {
    return path.join(userId.toString(), portfolioId.toString(), fileName);
  }
}
