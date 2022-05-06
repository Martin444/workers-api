import { Exclude } from 'class-transformer';
import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryColumn,
} from 'typeorm';

@Entity()
export class Transaction {
    @PrimaryColumn()
    id: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    amount: string;

    @Column({ type: 'varchar', length: 255 })
    method: string;

    @Column({ type: 'varchar', length: 255 })
    transaction_type: string;

    @Exclude()
    @Column({ type: 'varchar', length: 255 })
    description: string;

    @Column({ type: 'varchar', length: 100 })
    client_id: string;

    @Column({ type: 'varchar', length: 100 })
    status: string;

    @Column({ type: 'int' })
    descont: number;

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
