import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { UserModel } from '#infra/database/entities/user.model';

import { USER_REPOSITORY } from '../models/constants/user.constants';
import { USER_DELETED } from '../models/constants/user-events';
import { UserRepositoryInterface } from '../models/interfaces/user-repository.interface';
import { UserServiceInterface } from '../models/interfaces/user-service.interface';
import { CreateUserInput } from '../models/types/create-user-input.type';

@Injectable()
export class UserService implements UserServiceInterface {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryInterface,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(data: CreateUserInput): Promise<UserModel> {
    return await this.userRepository.create(data);
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);

    this.eventEmitter.emit(USER_DELETED, {
      userId: id,
    });
  }

  async ensureEmailIsUnique(email: string): Promise<void> {
    const isUserExist = await this.userRepository.existsBy({
      email,
    });

    if (isUserExist) {
      throw new ConflictException('Email already exists');
    }
  }
}
