import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { AddUserDto } from './dto/add-user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [];

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
