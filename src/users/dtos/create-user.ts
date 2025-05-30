import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsEmail()
  @IsNotEmpty({message : "Email is requuired !"})
  email: string;
  @IsString()
  password: string;
}
