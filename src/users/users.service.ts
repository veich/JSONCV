import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignupAuthDto } from 'src/auth/dto/signup-auth.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private configService: ConfigService
  ) { }

  private addSkillsField(users: User[]): User[] {
    users.forEach((user) => {
      const skillsSet = new Set<string>();
      user.experiences.forEach((experience) => {
        experience.skills.forEach((skill) => {
          skillsSet.add(skill.skillName);
        });
      });
      user.skills = [...skillsSet];
    });
    return users;
  }

  async create(signupAuthDto: SignupAuthDto) {
    const passwordHash = await bcrypt.hash(
      signupAuthDto.password,
      this.configService.get('appConfig').bcryptSecret
    );
    const user: User = this.usersRepository.create({ ...signupAuthDto, passwordHash });
    await this.usersRepository.save(user);
    return user;
  }

  async findAll() {
    const users = await this.usersRepository.find({
      relations: {
        experiences: {
          skills: true,
          position: true,
        }
      }
    });
    return this.addSkillsField(users);
  }

  async findOne(userId: number) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: {
        experiences: {
          skills: true,
          position: true,
        }
      }
    });
    if (!user) throw new NotFoundException();
    const [userWithSkills] = this.addSkillsField([user]);
    return userWithSkills;
  }

  findByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({ where: { id } });
    Object.assign(user, updateUserDto);
    return this.usersRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    await this.usersRepository.remove(user);
    return {};
  }
}
