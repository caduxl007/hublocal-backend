import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { errorMessages } from 'src/shared/constants/error-messages';

export class SignInUserDto {
  @ApiProperty()
  @IsEmail({
    message: errorMessages.USER.EMAIL,
  })
  email: string;

  @ApiProperty()
  @IsNotEmpty({
    message: errorMessages.USER.PASSWORD,
  })
  password: string;
}
