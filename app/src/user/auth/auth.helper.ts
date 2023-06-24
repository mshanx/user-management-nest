import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './auth.dto';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthHelper {
  private readonly jwt: JwtService;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    jwt: JwtService,
  ) {
    this.jwt = jwt;
  }

  isPasswordValid(dtoPassword: string, dbPassword: string): boolean {
    return bcrypt.compare(dtoPassword, dbPassword);
  }

  generateToken(user: User): object {
    return {
      userToken: this.jwt.sign({ id: user.id, email: user.email }),
    };
  }

  encodePassword(password: string): string {
    const salt: string = bcrypt.genSaltSync(10);

    return bcrypt.hashSync(password, salt);
  }

  validateUser(payload: LoginDto): Promise<User> {
    return this.userRepository.findOne({
      where    : { email: payload.email },
    });
  }
}