import { Exclude } from 'class-transformer';
import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryColumn,
} from 'typeorm';

@Entity()
export class Client {
    @PrimaryColumn()
    id: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    phone_number: string;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 255 })
    email: string;

    @Exclude()
    @Column({ type: 'varchar', length: 255 })
    status: string;

    @Column({ type: 'varchar', length: 100 })
    clabe: string;

    @Column({ type: 'varchar', length: 100 })
    ownerId: string;

    @Column({ type: 'varchar', length: 100 })
    creation_date: string;

    @CreateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createAt: Date;

    @UpdateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    updateAt: Date;
}
