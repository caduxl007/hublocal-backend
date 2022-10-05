import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateAddressDto } from 'src/modules/address/dto/create-address.dto';
import { Company } from 'src/modules/companies/entities/company.entity';

export class CreatePlaceDto extends CreateAddressDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe o nome do local',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty({
    message: 'Informe o ID da empresa',
  })
  @IsString()
  companyId: string;
}
