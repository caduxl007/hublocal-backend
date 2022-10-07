import { Address } from 'src/modules/address/entities/address.entity';
import { Place } from 'src/modules/places/entities/place.entity';
import { User } from 'src/modules/users/model/entities/user.entity';
import { BaseDataEntity } from 'src/shared/entities/base-data-entity.entity';
import {
  AfterInsert,
  AfterUpdate,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
} from 'typeorm';
import { StatusTicketEnum } from '../enum/status-ticket.enum';

class DataUpdatePlace extends Address {
  @Column()
  newNameLocal: string;
}

@Entity({
  name: 'tickets',
})
export class Ticket extends BaseDataEntity {
  @Column()
  title: string;

  @Column({
    type: 'enum',
    enum: StatusTicketEnum,
    default: StatusTicketEnum.PENDENTE,
  })
  status: StatusTicketEnum;

  @Column({ type: 'jsonb' })
  address: DataUpdatePlace;

  @ManyToOne(() => User, (user) => user.created_tickets)
  fromUser: User;

  @ManyToOne(() => User, (user) => user.received_tickets)
  toUser: User;

  @ManyToOne(() => Place, (place) => place.tickets, {
    onDelete: 'CASCADE',
  })
  place: Place;

  @AfterInsert()
  changeTitle() {
    this.title = `${this.id} - ${this.place.name}`;
  }
}
