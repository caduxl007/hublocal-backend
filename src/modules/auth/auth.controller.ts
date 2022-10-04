import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SignInUserDto } from './model/dto/singin-user.dto';
import { User } from '../users/model/entities/user.entity';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/model/dto/create-user.dto';

@Controller('auth')
@ApiTags('Autenticação')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  signIn(@Body() dto: SignInUserDto): Promise<{
    user: User;
    token: string;
  }> {
    return this.authService.signIn(dto);
  }

  @Post('/signup')
  signUp(@Body() dto: CreateUserDto): Promise<void> {
    return this.authService.signUp(dto);
  }
}
