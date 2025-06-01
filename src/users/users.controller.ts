import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user';
import { Users } from './users.entity';

@Controller('auth')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    return this.userService.createUser(body);
  }
  @Get('/finduser/:email')
  findUsers(@Param('email') email: string) {
    console.log(email, 'email');

    return this.userService.findUsers(email);
  }
  @Get('/users')
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Put('/updateuser/:id')
  updateUser(@Param('id') id: number, @Body() attrs: Partial<Users>) {
    return this.userService.updateUser(id, attrs);
  }
  
  @Delete("/deleteuser/:id")
  removeuser(@Param('id') id : number) {
    return this.userService.removeuser(id);
  }
}
