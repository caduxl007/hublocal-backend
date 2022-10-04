import { Exclude } from 'class-transformer';
import { BaseDataEntity } from 'src/shared/entities/base-data-entity.entity';
import { Column, Entity } from 'typeorm';

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
}
