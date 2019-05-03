import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { AddUserDto } from './dto/add-user.dto';
import { CONSTANTS } from '../constants';

@Injectable()
export class UsersService implements OnModuleInit {
  private users: User[] = [];

  constructor(
    @Inject(CONSTANTS.loggerProviderSym)
    private readonly logger: any,
  ) {}

  onModuleInit(): void {
    this.logger.info('Users Service has been initialized.');
  }

  getAll(): User[] {
    return [...this.users];
  }

  add(userDto: AddUserDto) {
    const id = (Math.random() * 100).toFixed(0);
    const user: User = { id, ...userDto };

    this.users.push(user);
  }

  findById(id: string): User | undefined {
    const userFound = this.users.find(user => user.id === id);

    if (!userFound) {
      return undefined;
    }
    return { ...userFound };
  }
}
