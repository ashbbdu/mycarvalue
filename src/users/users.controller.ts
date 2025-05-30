import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user';

@Controller('auth')
export class UsersController {
    constructor(private readonly userService: UsersService) {}
    @Post("/signup")
    createUser (@Body () body : CreateUserDto) {
        return this.userService.createUser(body);
    }
    @Get("/users")
    getAllUsers() {
        return this.userService.getAllUsers();
    }
}
