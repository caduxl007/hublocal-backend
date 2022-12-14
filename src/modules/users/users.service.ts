import {
  BadRequestException,
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
import { errorMessages } from 'src/shared/constants/error-messages';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
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
      if (err.code === '23505') {
        throw new BadRequestException('E-mail já está em uso.');
      } else {
        throw new InternalServerErrorException(
          errorMessages.USER.ERROR_CREATE_USER,
        );
      }
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

    if (!user) {
      throw new BadRequestException(errorMessages.AUTH.INVALID_CREDENTIALS);
    }

    const verifyPassword = await compare(password, user?.password);

    if (user && verifyPassword) {
      return user;
    } else {
      throw new BadRequestException(errorMessages.AUTH.INVALID_CREDENTIALS);
    }
  }

  private hashedPassword(password: string): Promise<string> {
    const hashedPassword = hash(password, 10);

    return hashedPassword;
  }
}
