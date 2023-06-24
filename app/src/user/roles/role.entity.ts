import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from './role.enum';

@Entity({ name: 'roles' })
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: UserRole, nullable: false })
  name: UserRole;

  constructor(roleData: Partial<Role> = {}) {
    Object.assign(this, roleData);
  }
}