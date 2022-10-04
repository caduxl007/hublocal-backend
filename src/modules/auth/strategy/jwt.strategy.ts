import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/modules/users/model/entities/user.entity';
import { IUsersService } from 'src/modules/users/model/interfaces/users-service.interface';

export type PayloadType = {
  id: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: IUsersService,

    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: PayloadType): Promise<User> {
    const { id } = payload;

    const user = await this.usersService.findOne(id);

    return user;
  }
}
