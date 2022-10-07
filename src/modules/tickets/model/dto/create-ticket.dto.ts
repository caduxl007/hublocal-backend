import { CreateAddressDto } from 'src/modules/address/dto/create-address.dto';
import { Place } from 'src/modules/places/entities/place.entity';
import { User } from 'src/modules/users/model/entities/user.entity';

export class CreateTicketDto extends CreateAddressDto {
  toUser: User;
  fromUser: User;
  place: Place;
  name?: string;
}
