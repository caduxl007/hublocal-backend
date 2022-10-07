import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { GetUser } from '../auth/decorator/current-user.decorator';
import { User } from '../users/model/entities/user.entity';

@Controller('users')
@ApiTags('Usuários')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UsersController {
  @Get('/me')
  create(@GetUser() user: User): User {
    return user;
  }
}
