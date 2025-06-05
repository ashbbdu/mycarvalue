import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { promisify } from 'util';
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { CreateUserDto } from './dtos/create-user';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}
  async signup(data: CreateUserDto) {
    const { email, password, firstName, lastName } = data;
    const existingUser = await this.userService.findUsers(email);
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

    return await this.userService.createUser(data);
  }

  async signin(data: any) {
    // wrong it should return a single user but it is returning an array means the in findusers return await this.userRepository.find({ where: { email: email } }); this is implemented which return all the users that matches that email , that is why it is returning an array of object
    const existingUser = await this.userService.findUsers(data.email);
    if (!existingUser) {
      throw new BadRequestException('User not found !');
    }
    console.log(existingUser[0].password);

    try {
      const key = (await promisify(scrypt)(
        existingUser[0].password,
        'salt',
        32,
      )) as Buffer;
      const iv = randomBytes(16);
      const decipher = createDecipheriv('aes-256-ctr', key, iv);
      const decrypted = Buffer.concat([
        decipher.update(Buffer.from(existingUser[0].password, 'hex')),
        decipher.final(),
      ]);
      if (decrypted.toString() !== data.password) {
        throw new BadRequestException('Invalid credentials');
      }
    
    } catch (e) {
      console.log(e, 'errrrrr');
    }
  }
}
