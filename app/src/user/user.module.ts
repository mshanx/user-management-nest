import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserHelper } from './user.helper';
import { User } from './user.entity';

@Module({
  imports    : [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers  : [UserService, UserHelper],
  exports    : [UserService],
})
export class UserModule {
}