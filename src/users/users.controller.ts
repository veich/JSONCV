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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { Public } from '../auth/decorators/public.decorator';
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

  @ApiOkResponse({ type: User })
  // @ApiForbiddenResponse()
  @ApiBadRequestResponse()
  @ApiBearerAuth()
  @Patch()
  // @Patch('id')
  async update(
    // @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req,
  ) {
    // if (req.user.sub !== id) {
    //   throw new ForbiddenException();
    //   // this is (kinda) unnecessary
    //   // we could avoid this issue completely if we remove :id param from endpoint
    //   // and only allow each user to only update themselves
    //   // .update(req.user.sub, updateUserDto);
    //   // on the other hand...
    //   // we might want to have some admin users that can delete others(?)
    //   // but then again they could have their own dedicated /admin API
    //   // the same goes for DELETE endpoint
    //   // VERDICT: I'm removing it :)
    // }
    // const updatedUser = await this.usersService.update(id, updateUserDto);
    const updatedUser = await this.usersService.update(req.user.sub, updateUserDto);
    return this.cleanUser(updatedUser);
  }

  @ApiOkResponse({ type: Object })
  @ApiForbiddenResponse()
  @ApiBearerAuth()
  @Delete()
  remove(@Request() req) {
    return this.usersService.remove(req.user.sub);
  }
}
