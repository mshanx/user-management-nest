import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { RolesGuard } from './roles.guard';

@Module({
  imports  : [TypeOrmModule.forFeature([Role])],
  providers: [RolesGuard],
  exports  : [RolesGuard],
})
export class RoleModule {
}