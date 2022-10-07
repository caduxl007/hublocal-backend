import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { StatusTicketEnum } from '../enum/status-ticket.enum';
import { CreateTicketDto } from './create-ticket.dto';

export class UpdateTicketDto extends PartialType(CreateTicketDto) {
  @IsEnum(StatusTicketEnum)
  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe o status do ticket',
  })
  status: StatusTicketEnum;
}
