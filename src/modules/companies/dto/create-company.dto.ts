import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe o nome da empresa',
  })
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe o CNPJ da empresa',
  })
  @IsString()
  @MinLength(14)
  @MaxLength(14)
  cnpj: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe a descrição da empresa',
  })
  @IsString()
  description: string;
}
