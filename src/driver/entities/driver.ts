import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class Driver {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  fullName: string;

  @Column({ type: 'int', unsigned: true })
  age: number;

  @Column({
    type: 'enum',
    enum: ['active', 'inactive'],
    default: 'active',
  })
  status: 'active' | 'inactive';
}
