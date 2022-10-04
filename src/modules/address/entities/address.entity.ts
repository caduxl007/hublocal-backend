import { BaseDataEntity } from 'src/shared/entities/base-data-entity.entity';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'addresses',
})
export class Address extends BaseDataEntity {
  @Column()
  cep: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column({ nullable: true })
  neighborhood: string;

  @Column({ nullable: true })
  street: string;

  @Column({ nullable: true })
  number: number;

  @Column({ nullable: true })
  complement: string;
}
