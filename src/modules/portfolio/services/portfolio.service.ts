import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PortfolioModel } from 'src/infra/database/entities/portfolio.model';

import { IMAGE_SERVICE } from '#modules/image/models/constants/image.constants';
import { ImageServiceInterface } from '#modules/image/models/interfaces/image-service.interface';

import { PORTFOLIO_REPOSITORY } from '../models/constants/portfolio.constants';
import { PORTFOLIO_DELETED } from '../models/constants/portfolio-events';
import { CreatePortfolioRequestDto } from '../models/dtos/requests/create-portfolio-request.dto';
import { PortfolioRepositoryInterface } from '../models/interfaces/portfolio-repository.interface';
import { PortfolioServiceInterface } from '../models/interfaces/portfolio-service.interface';
import { UploadImageInput } from '../models/types/upload-image-input.type';

@Injectable()
export class PortfolioService implements PortfolioServiceInterface {
  constructor(
    @Inject(IMAGE_SERVICE) private readonly imageService: ImageServiceInterface,
    @Inject(PORTFOLIO_REPOSITORY)
    private readonly portfolioRepository: PortfolioRepositoryInterface,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(userId: number, dto: CreatePortfolioRequestDto): Promise<void> {
    await this.portfolioRepository.create({
      userId,
      name: dto.name,
      description: dto.description,
    });
  }

  async uploadImage(input: UploadImageInput): Promise<void> {
    const { file, userId, portfolioId, dto } = input;

    const portfolio = await this.getByIdOrThrow(portfolioId);
    this.ensurePortoflioBelongsUser(userId, portfolio.userId);

    await this.imageService.upload({
      file,
      portfolioId,
      userId,
      description: dto.description,
    });
  }

  async delete(userId: number, id: number): Promise<void> {
    const portfolio = await this.getByIdOrThrow(id);

    this.ensurePortoflioBelongsUser(userId, portfolio.userId);

    await this.portfolioRepository.deleteById(id);

    this.eventEmitter.emit(PORTFOLIO_DELETED, {
      userId,
      portfolioId: portfolio.id,
    });
  }

  async getByIdOrThrow(id: number): Promise<PortfolioModel> {
    const portfolio = await this.portfolioRepository.findById(id);

    if (!portfolio) {
      throw new NotFoundException('Portfolio not found');
    }

    return portfolio;
  }

  ensurePortoflioBelongsUser(userId: number, portfolioOwnerId: number): void {
    if (userId !== portfolioOwnerId) {
      throw new ForbiddenException(
        'You do not have permission to access this portfolio',
      );
    }
  }
}
