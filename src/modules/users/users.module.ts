import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { IUsersService } from './model/interfaces/users-service.interface';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './model/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [],
  providers: [{ provide: IUsersService, useClass: UsersService }],
  exports: [{ provide: IUsersService, useClass: UsersService }],
})
export class UsersModule {}
