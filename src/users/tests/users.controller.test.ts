import * as pino from 'pino';

import { UsersController } from '../users.controller';
import { UsersService }    from '../users.service';
import { User }            from '../interfaces/user.interface';


describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  const id = (Math.random() * 100).toFixed(0);
  const user: User = { id, name: 'Eze', age: 32 };

  beforeEach(()=> {
    usersService = new UsersService(pino({
      prettyPrint: { colorize: true },
    }));
    usersController = new UsersController(usersService);
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = [user];

      jest.spyOn(usersService, 'getAll').mockImplementation(() => result);

      expect(await usersService.getAll()).toBe(result);
    });
  });
});
