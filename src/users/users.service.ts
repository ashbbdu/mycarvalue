import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
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
  async createUser(data: CreateUserDto) {
    const { firstName, lastName, email, password } = data;
    const user = await this.userRepository.create({
      firstName,
      lastName,
      email,
      password,
    });
    return await this.userRepository.save(user);
  }
  async findUsers(email: string) {
    return await this.userRepository.find({ where: { email: email } });
  }
 async getAllUsers() {
    return await this.userRepository.find();
  }

    async updateUser(id: number, attrs: Partial<Users>)  {
        console.log(id , "id");
        
        const user = await this.userRepository.findOneBy({id});
        console.log(user , "up")
        if (!user) {
             throw new HttpException('User not found', HttpStatus.NOT_FOUND);;
        }

        Object.assign(user , attrs);
        return this.userRepository.save(user);
    }

    async removeuser(id : number) {
        const user = await this.userRepository.findOneBy({id});
        if (!user) {
             throw new HttpException('User not found', HttpStatus.NOT_FOUND);;
        }
       const deleteUser = await this.userRepository.remove(user);
       if(!deleteUser) {
            throw new HttpException("Internal Server Error !" , HttpStatus.INTERNAL_SERVER_ERROR);
       }

       return {
        message : "User deleted successfully !"
       }
      }
}
