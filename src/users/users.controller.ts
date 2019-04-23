import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  ParseIntPipe,
  Post,
  SetMetadata,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { User } from './interfaces/user.interface';
import { UsersService } from './users.service';
import { AddUserDto } from './dto/add-user.dto';
import { ValidationPipe } from '../pipes/validation.pipe';
import { AuthorizationGuard } from '../auth/authorization.guard';
import { Roles } from '../decorators/roles.decorator';
import { LoggingInterceptor } from '../interceptors/logging.interceptor';
import { TransformInterceptor } from '../interceptors/transform.interceptor';
import { UsersCacheInterceptor } from './users.cache.interceptor';
import { TimeoutInterceptor } from '../interceptors/timeout.interceptor';

@Controller('users')
@UseGuards(AuthorizationGuard)
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseInterceptors(UsersCacheInterceptor)
  getAll(): User[] {
    return this.usersService.getAll();
  }

  @Get(':id')
  @UseInterceptors(TimeoutInterceptor)
  findOne(@Param('id', new ParseIntPipe()) userId): User {
    return this.usersService.findById(userId);
  }

  @Post()
  @Header('Cache-Control', 'none')
  @Roles('admin')
  add(@Body(new ValidationPipe()) addUserDto: AddUserDto) {
    this.usersService.add(addUserDto);
  }
}
