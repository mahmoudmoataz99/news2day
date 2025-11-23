import { Controller, Get, Put, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('myprofile')
  @UseGuards(JwtAuthGuard)
  getMyProfile(@Request() req: any) {
    return this.usersService.getProfile(req.user.userId);
  }

  @Put('myprofile')
  @UseGuards(JwtAuthGuard)
  updateMyProfile(@Request() req: any, @Body() updates: UpdateUserDto) {
    return this.usersService.update(req.user.userId, updates);
  }

  @Get('profile/:id')
  getProfile(@Param('id') id: string) {
    return this.usersService.getProfile(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updates: UpdateUserDto) {
    return this.usersService.update(id, updates);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}