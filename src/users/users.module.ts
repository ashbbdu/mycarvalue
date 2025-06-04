import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users])], // this step is creating the repository for us
  controllers: [UsersController],
  providers: [UsersService , AuthService]
})
export class UsersModule {}
