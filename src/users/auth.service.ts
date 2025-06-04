import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { promisify } from 'util';
import { createCipheriv, randomBytes, scrypt } from 'crypto';
import { CreateUserDto } from './dtos/create-user';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}
  async signup(data: CreateUserDto) {
    const { email, password, firstName, lastName } = data;
    const existingUser = await this.userService.findUsers(email);
    console.log(existingUser, 'existinguser');
    if (existingUser.length) {
      throw new BadRequestException('Email already in use !');
    }

    const iv = randomBytes(16);
    const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, iv);

    const textToEncrypt = 'Nest';
    const encryptedText = Buffer.concat([
      cipher.update(textToEncrypt),
      cipher.final(),
    ]);
    data.password = encryptedText.toString();
    console.log(data, 'data');

    return await this.userService.createUser(data);
  }

  signin() {}
}
