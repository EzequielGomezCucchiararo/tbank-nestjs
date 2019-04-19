import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  /**
   * Allow to use instances between modules
   */
  exports: [UsersService],
})
export class UsersModule {}
