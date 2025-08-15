import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Passenger } from './passenger.entities';

@Entity('tickets')
export class Ticket {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    routeName: string;

    @Column()
    seatNumber: string;

    @Column()
    price: number;

    @Column()
    journeyDate: Date;

    @Column({ default: 'pending' })
    status: string;

    @ManyToOne(() => Passenger, passenger => passenger.tickets)
    passenger: Passenger;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
