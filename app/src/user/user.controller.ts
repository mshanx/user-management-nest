import {
  Controller, Get, Body, Param, ParseIntPipe, UseGuards,
  UseInterceptors, ClassSerializerInterceptor, Req, Put,
} from '@nestjs/common';
import { Roles } from './roles/roles.decorator';
import { RolesGuard } from './roles/roles.guard';
import { JwtAuthGuard } from './auth/auth.guard';
import { UserService } from './user.service';
import { User } from './user.entity';
import { updateUserBossDto } from './user.dto';
import { Request } from 'express';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get()
  @Roles('admin', 'boss', 'regular')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  getList(@Req() request: Request): Promise<User[]> {
    return this.userService.getList(request.user);
  }

  @Put('update/:userId')
  @Roles('boss')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  update(
    @Req() request: Request,
    @Param('userId', ParseIntPipe) userId: number,
    @Body() newBossDto: updateUserBossDto,
  ): Promise<User> {
    return this.userService.update(request.user, userId, newBossDto);
  }
}