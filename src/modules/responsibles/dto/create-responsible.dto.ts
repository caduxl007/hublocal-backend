import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateAddressDto } from 'src/modules/address/dto/create-address.dto';

export class CreateResponsibleDto extends CreateAddressDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe o nome do responsavel',
  })
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe o telefone do responsavel',
  })
  @IsString()
  telephone: string;

  @IsOptional()
  @IsBoolean()
  isMain?: boolean;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty({
    message: 'Informe o ID da empresa',
  })
  @IsString()
  companyId: string;
}
