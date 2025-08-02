import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert } from 'typeorm';

@Entity('passengers')
export class Passenger {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100, unique: true })
    username: string;

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
    generateId() {
        // Custom logic before insertion
        // You can add any custom ID generation logic here
        console.log('Generating custom ID logic before insertion');
        // For example, you could set default values or perform validation
        if (!this.username) {
            throw new Error('Username is required');
        }
        if (!this.fullName) {
            throw new Error('Full name is required');
        }
    }
} 