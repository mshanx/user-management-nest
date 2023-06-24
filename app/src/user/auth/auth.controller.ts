import { Body, Controller, Inject, Post } from '@nestjs/common';
import { LoginDto, RegisterDto } from './auth.dto';
import { AuthService } from './auth.service';
import { User } from '../user.entity';

@Controller('auth')
export class AuthController {
  @Inject(AuthService)
  private readonly authService: AuthService;

  @Post('register')
  private register(@Body() credentials: RegisterDto): Promise<User> {
    return this.authService.register(credentials);
  }

  @Post('login')
  private login(@Body() credentials: LoginDto): Promise<object> {
    return this.authService.login(credentials);
  }
}