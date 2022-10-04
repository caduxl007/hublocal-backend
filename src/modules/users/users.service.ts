import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './model/dto/create-user.dto';
import { User } from './model/entities/user.entity';
import { IUsersService } from './model/interfaces/users-service.interface';
import { errorMessages } from 'src/shared/constants/error-messages';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto) {
    const { name, email, password } = dto;

    const hashedPassword = await this.hashedPassword(password);

    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    try {
      return await this.usersRepository.save(user);
    } catch (err) {
      throw new InternalServerErrorException(
        errorMessages.USER.USER_NOT_EXISTS,
      );
    }
  }

  async findOne(id?: string, email?: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: {
        id,
        email,
      },
    });

    if (!user) {
      throw new NotFoundException(errorMessages.USER.USER_NOT_EXISTS);
    }

    return user;
  }

  async checkCredentials(email: string, password: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: {
        email,
      },
    });

    if (user && compare(password, user.password)) {
      return user;
    } else {
      throw new UnauthorizedException(errorMessages.AUTH.INVALID_CREDENTIALS);
    }
  }

  private hashedPassword(password: string): Promise<string> {
    const hashedPassword = hash(password, 10);

    return hashedPassword;
  }
}
