import { Body, Controller, Get, Header, Param, Post } from '@nestjs/common';

import { User } from './interfaces/user.interface';
import { UsersService } from './users.service';
import { AddUserDto } from './dto/add-user.dto';
import { ValidationPipe } from '../pipes/validation.pipe';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll(): User[] {
    return this.usersService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') userId): User {
    return this.usersService.findById(userId);
  }

  @Post()
  @Header('Cache-Control', 'none')
  add(@Body(new ValidationPipe()) addUserDto: AddUserDto) {
    this.usersService.add(addUserDto);
  }
}
