import { Injectable } from '@nestjs/common';
import { SignupAuthDto } from './dto/signup-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  signup(signupAuthDto: SignupAuthDto) {
    return 'signup - service';
  }

  login(loginAuthDto: LoginAuthDto) {
    return `login - service`;
  }
}
