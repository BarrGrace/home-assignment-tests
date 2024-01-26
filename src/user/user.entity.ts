import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from '../account/account.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Account, account => account.user)
  accounts: Account[];
}
