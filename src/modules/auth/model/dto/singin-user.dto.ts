import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { errorMessages } from 'src/shared/constants/error-messages';

export class SignInUserDto {
  @ApiProperty()
  @IsNotEmpty({
    message: errorMessages.USER.EMAIL,
  })
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty({
    message: errorMessages.USER.PASSWORD,
  })
  password: string;
}
