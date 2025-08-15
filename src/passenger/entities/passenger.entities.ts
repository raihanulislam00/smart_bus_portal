import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, OneToMany } from 'typeorm';
import { Ticket } from './ticket.entity';
import * as bcrypt from 'bcrypt';

@Entity('passengers')
export class Passenger {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100, unique: true })
    username: string;

    @OneToMany(() => Ticket, ticket => ticket.passenger)
    tickets: Ticket[];

    @Column({ type: 'varchar', length: 150 })
    fullName: string;

    @Column({ type: 'boolean', default: false })
    isActive: boolean;

    @Column({ type: 'varchar', length: 50, nullable: true })
    mail?: string;

    @Column({ type: 'varchar', length: 11, nullable: true })
    phone?: string;

    @Column({ type: 'varchar', length: 200, nullable: true })
    address?: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn({ nullable: true })
    updatedAt?: Date;

    @Column({ type: 'varchar', length: 10, nullable: true })
    gender?: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    password?: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    photoPath?: string;

    @BeforeInsert()
    async hashPassword() {
        if (this.password) {
            const salt = await bcrypt.genSalt();
            this.password = await bcrypt.hash(this.password, salt);
        }
        
        if (!this.username) {
            throw new Error('Username is required');
        }
        if (!this.fullName) {
            throw new Error('Full name is required');
        }
    }

    async validatePassword(password: string): Promise<boolean> {
        if (!this.password) {
            return false;
        }
        return bcrypt.compare(password, this.password);
    }
} 