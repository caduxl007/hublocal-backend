import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';

export abstract class IUsersService {
  abstract create(dto: CreateUserDto): Promise<User>;
  abstract findOne(id?: string, email?: string): Promise<User>;
  abstract checkCredentials(email: string, password: string): Promise<User>;
}
