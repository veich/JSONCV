import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
  Request,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiAcceptedResponse, ApiBadRequestResponse, ApiBearerAuth, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  private cleanUser(user: User) {
    const { passwordHash, ...cleanUser } = user;
    return cleanUser;
  }

  @ApiOkResponse({ type: User, isArray: true })
  @Public()
  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return users.map((user) => this.cleanUser(user));
  }

  @ApiOkResponse({ type: User })
  @ApiNotFoundResponse()
  @Public()
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }
    return this.cleanUser(user);
  }

  // @UseGuards(AuthGuard)
  @ApiOkResponse({ type: User })
  @ApiForbiddenResponse()
  @ApiBadRequestResponse()
  @ApiBearerAuth()
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req,
  ) {
    if (req.user.sub !== id) {
      throw new ForbiddenException();
    }
    const updatedUser = await this.usersService.update(id, updateUserDto);
    return this.cleanUser(updatedUser);
  }

  @ApiOkResponse({ type: Object })
  @ApiForbiddenResponse()
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
    if (req.user.sub !== id) {
      throw new ForbiddenException();
    }
    return this.usersService.remove(id);
  }
}
