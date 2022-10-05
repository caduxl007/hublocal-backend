import { Address } from 'src/modules/address/entities/address.entity';
import { Company } from 'src/modules/companies/entities/company.entity';
import { BaseDataEntity } from 'src/shared/entities/base-data-entity.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity({
  name: 'places',
})
export class Place extends BaseDataEntity {
  @Column()
  name: string;

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;

  @ManyToOne(() => Company, (company) => company.places, {
    cascade: true,
  })
  company: Company;
}
