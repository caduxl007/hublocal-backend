import { Address } from 'src/modules/address/entities/address.entity';
import { Company } from 'src/modules/companies/entities/company.entity';
import { BaseDataEntity } from 'src/shared/entities/base-data-entity.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity({
  name: 'responsibles',
})
export class Responsible extends BaseDataEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  telephone: string;

  @Column({ default: false })
  isMain: boolean;

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;

  @ManyToOne(() => Company, (company) => company.responsibles)
  company: Company;
}
