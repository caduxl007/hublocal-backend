import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { errorMessages } from 'src/shared/constants/error-messages';

export class CreateUserDto {
  @IsNotEmpty({
    message: errorMessages.USER.NAME,
  })
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty({
    message: errorMessages.USER.EMAIL,
  })
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty({
    message: errorMessages.USER.PASSWORD,
  })
  @IsString()
  @ApiProperty()
  password: string;
}
