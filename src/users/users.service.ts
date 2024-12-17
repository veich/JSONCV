import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly dummyUsers: User[] = [
    {
      id: 1,
      email: 'john@mail.com',
      passwordHash:
        '$2b$10$CHjYd5AnTr9TDVMvgmRTCOiHk5It6dYR1MWCp5Jd5vpyvgk6izrHq', // password1
    },
    {
      id: 2,
      email: 'maria@mail.com',
      passwordHash:
        '$2b$10$CHjYd5AnTr9TDVMvgmRTCOMDyTs0g9OBS3G9XWYT9rDdp6.oKuezi', // password2
    },
  ];

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(userId: number) {
    return this.dummyUsers.find((user) => user.id === userId);
  }

  findByEmail(email: string) {
    return this.dummyUsers.find((user) => user.email === email);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
