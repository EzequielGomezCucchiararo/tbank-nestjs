import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UtilsModule } from '../utils/utils.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [UtilsModule],
  exports: [UsersService],
})
export class UsersModule {}
