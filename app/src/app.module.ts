import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './user/auth/auth.module';
import { RoleModule } from './user/roles/role.module';

@Module({
  imports    : [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    AuthModule,
    RoleModule,
    TypeOrmModule.forRootAsync({
      inject    : [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type            : 'mysql',
        host            : configService.get('DB_HOST'),
        port            : +configService.get('DB_PORT'),
        username        : configService.get('DB_USER'),
        password        : configService.get('DB_PASSWORD'),
        database        : configService.get('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize     : false,
      }),
    }),
  ],
  controllers: [],
  providers  : [],
})
export class AppModule {
}