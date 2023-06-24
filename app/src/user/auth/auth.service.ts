import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto, RegisterDto } from './auth.dto';
import { argumentsAssert, notFoundAssert } from '../../../errors';
import { User } from '../user.entity';
import { AuthHelper } from './auth.helper';
import { UserRole } from '../roles/role.enum';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AuthService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  @Inject(AuthHelper)
  private readonly helper: AuthHelper;

  async register(dto: RegisterDto): Promise<User | never> {
    const { name, email, password }: RegisterDto = dto;

    const existingUser: User = await this.userRepository.findOneBy({ email });

    argumentsAssert(!existingUser, 'Email already registered');

    const user = new User();

    user.name = name;
    user.email = email;
    user.password = this.helper.encodePassword(password);
    user.role = UserRole.Regular;

    const registeredUser = await this.userRepository.save(user);

    return plainToInstance(User, registeredUser);
  }

  async login(body: LoginDto): Promise<object> {
    const { email, password }: LoginDto = body;
    const user: User = await this.userRepository.findOneBy({ email });

    notFoundAssert(user, 'No user with such email');

    const isPasswordValid: boolean = this.helper.isPasswordValid(
      password,
      user.password,
    );

    argumentsAssert(isPasswordValid, 'Invalid password');

    return this.helper.generateToken(user);
  }
}