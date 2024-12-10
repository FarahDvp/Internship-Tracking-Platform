import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { MongoRepository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: MongoRepository<User>,
  ) {}

  async create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
  async getAll(): Promise<User[]> {
    return this.userRepository.find();
  }
}
