import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PayloadType } from './strategy/jwt.strategy';
import { SignInUserDto } from './model/dto/singin-user.dto';
import { CreateUserDto } from '../users/model/dto/create-user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(dto: SignInUserDto) {
    const { email, password } = dto;
    const user = await this.userService.checkCredentials(email, password);

    const id = user.id;

    const payload: PayloadType = { id };
    delete user.password;
    const token = this.jwtService.sign(payload);

    return {
      user,
      token,
    };
  }

  async signUp(dto: CreateUserDto): Promise<void> {
    const { name, email, password } = dto;

    await this.userService.create({
      name,
      email,
      password,
    });
  }
}
