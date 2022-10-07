import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreatePlaceDto } from './create-place.dto';

export class UpdatePlaceDto extends PartialType(CreatePlaceDto) {
  @ApiProperty({
    type: String,
  })
  @IsNotEmpty({
    message: 'Informe o email do usuário que irá atender o ticket',
  })
  @IsString()
  emailToUser: string;
}
