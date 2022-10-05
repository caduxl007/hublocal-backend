import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe o cep',
  })
  @IsString()
  cep: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe a cidade',
  })
  @IsString()
  city: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe o estado',
  })
  @IsString()
  state: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe o bairro',
  })
  @IsString()
  neighborhood: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe a rua',
  })
  @IsString()
  street: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe o número',
  })
  @IsNumber()
  number: number;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe o complemento',
  })
  @IsString()
  complement: string;
}
