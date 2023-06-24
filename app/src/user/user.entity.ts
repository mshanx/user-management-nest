import { UserRole } from './roles/role.enum';
import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ unique: true, nullable: false, length: 50 })
  email: string;

  @Column({ nullable: false, length: 50 })
  @Exclude()
  password: string;

  @Column({ length: 50 })
  name: string;

  @Index()
  @Column()
  bossId: number;

  @Column({ default: false })
  online: boolean;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.Regular })
  role: UserRole;

  constructor(userData: Partial<User> = {}) {
    Object.assign(this, userData);
  }
}