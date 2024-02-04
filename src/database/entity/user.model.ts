import { Column, Entity, Generated, PrimaryColumn } from 'typeorm';
import { IUserModel } from '../../types/db-model-types';

@Entity({ name: `user` })
export class UserModel implements IUserModel {
  @Generated('increment')
  @Column()
  id: number;

  @PrimaryColumn()
  uuid: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  email: string;

  @Column({ unique: true })
  phone_number: string;

  @Column()
  password: string;

  @Column({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
