import { Address } from 'src/modules/address/entities/address.entity';
import { Company } from 'src/modules/companies/entities/company.entity';
import { Responsible } from 'src/modules/responsibles/entities/responsible.entity';
import { Ticket } from 'src/modules/tickets/model/entities/ticket.entity';
import { BaseDataEntity } from 'src/shared/entities/base-data-entity.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity({
  name: 'places',
})
export class Place extends BaseDataEntity {
  @Column()
  name: string;

  @OneToOne(() => Address, {
    cascade: true,
  })
  @JoinColumn()
  address: Address;

  @OneToMany(() => Ticket, (ticket) => ticket.place)
  @JoinColumn()
  tickets: Ticket[];

  @OneToMany(() => Responsible, (responsible) => responsible.place)
  @JoinColumn()
  responsibles: Responsible[];

  @ManyToOne(() => Company, (company) => company.places, {
    onDelete: 'CASCADE',
  })
  company: Company;
}
