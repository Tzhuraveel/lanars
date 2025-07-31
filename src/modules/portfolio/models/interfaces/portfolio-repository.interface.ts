import { PortfolioModel } from 'src/infra/database/entities/portfolio.model';

export interface PortfolioRepositoryInterface {
  create(data: Partial<PortfolioModel>): Promise<PortfolioModel>;
  findAllByUser(userId: number): Promise<PortfolioModel[]>;
  findById(id: number): Promise<PortfolioModel | null>;
  updateById(id: number, data: Partial<PortfolioModel>): Promise<void>;
  findByIdAndUserId(id: number, userId: number): Promise<PortfolioModel | null>;
  deleteById(id: number): Promise<number>;
}
