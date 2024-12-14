import { PartialType } from '@nestjs/mapped-types';
import { SignupAuthDto } from './signup-auth.dto';

export class LoginAuthDto extends PartialType(SignupAuthDto) { }
