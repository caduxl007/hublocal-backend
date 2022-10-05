import { Exclude } from 'class-transformer';
import { Company } from 'src/modules/companies/entities/company.entity';
import { BaseDataEntity } from 'src/shared/entities/base-data-entity.entity';
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';

@Entity({
  name: 'users',
})
export class User extends BaseDataEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => Company, (company) => company.user)
  @JoinColumn()
  companies: Company[];
}
