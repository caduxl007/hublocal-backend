import { Place } from 'src/modules/places/entities/place.entity';
import { Responsible } from 'src/modules/responsibles/entities/responsible.entity';
import { User } from 'src/modules/users/model/entities/user.entity';
import { BaseDataEntity } from 'src/shared/entities/base-data-entity.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity({
  name: 'companies',
})
export class Company extends BaseDataEntity {
  @Column()
  name: string;

  @Column({ unique: true, length: 14 })
  cnpj: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.companies)
  user: User;

  @OneToMany(() => Place, (place) => place.company)
  @JoinColumn()
  places: Place[];

  @OneToMany(() => Responsible, (responsible) => responsible.company)
  @JoinColumn()
  responsibles: Responsible[];
}
