import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignupAuthDto } from './dto/signup-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthResponseDto } from './dto/auth-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  signup(signupAuthDto: SignupAuthDto) {
    return 'signup - service';
  }

  async login(loginAuthDto: LoginAuthDto) {
    const user: User = this.usersService.findByEmail(loginAuthDto.email);
    const match: boolean =
      user && (await bcrypt.compare(loginAuthDto.password, user.passwordHash));

    if (!match) throw new UnauthorizedException();

    const payload = { sub: user.id, email: user.email };
    const response: AuthResponseDto = {
      access_token: await this.jwtService.signAsync(payload),
    };
    return response;
  }
}
