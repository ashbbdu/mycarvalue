import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}
  createUser(data: CreateUserDto) {
    const { firstName, lastName, email, password } = data;
    const user = this.userRepository.create({
      firstName,
      lastName,
      email,
      password,
    });
    return this.userRepository.save(user);
  }
  getAllUsers () {
    return this.userRepository.find()
  }
}
