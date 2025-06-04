import { Body, Controller, Delete, Get, Param, Post, Put , UseInterceptors , ClassSerializerInterceptor } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user';
import { Users } from './users.entity';
import { Serialize, SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user-dto';
import { AuthService } from './auth.service';

@Serialize(UserDto) // will be applied to all the routes
@Controller('auth')
export class UsersController {
  constructor(private readonly userService: UsersService , private readonly authService : AuthService) {}
  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    return this.authService.signup(body);
  }
  @Get('/finduser/:email')
  findUsers(@Param('email') email: string) {
    console.log(email, 'email');

    return this.userService.findUsers(email);
  }
  @Get('/users')
//   @UseInterceptors(ClassSerializerInterceptor)
  // @UseInterceptors(new SerializeInterceptor(UserDto))
  // @Serialize(UserDto) //custome serializer
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
