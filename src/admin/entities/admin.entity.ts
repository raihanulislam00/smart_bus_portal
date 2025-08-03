import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

@Entity('admin')
export class AdminEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ type: 'varchar', length: 150, unique: true })
    uniqueId: string;
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    joiningDate: Date;
    
    @Column({ type: 'varchar', length: 30, default: 'Unknown' })
    country: string;
    
    @Column({ type: 'varchar', length: 50 })
    name: string;
    
    @Column({ type: 'varchar', length: 100 })   
    password: string;
    
    @Column({ type: 'varchar', length: 50 })    
    mail: string;
    
    @Column({ type: 'varchar', length: 200, nullable: true })
    socialMediaLink: string;
    
    @Column({ type: 'varchar', length: 200, nullable: true })
    photoPath?: string;
    
  @BeforeInsert()
    generateUuid() {
        if (!this.uniqueId) {
            this.uniqueId = uuidv4();
        }
}
}