import { Exclude } from 'class-transformer';
import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryColumn,
} from 'typeorm';

@Entity()
export class Card {
    @PrimaryColumn()
    id: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    card_number: string;

    @Column({ type: 'varchar', length: 255 })
    type: string;

    @Column({ type: 'varchar', length: 255 })
    brand: string;

    @Exclude()
    @Column({ type: 'varchar', length: 255 })
    holder_name: string;

    @Column({ type: 'varchar', length: 100 })
    expiration_year: string;

    @Column({ type: 'varchar', length: 100 })
    expiration_month: string;

    @Column({ type: 'varchar', length: 100 })
    bank_name: string;

    @Column({ type: 'varchar', length: 100 })
    bank_code: string;

    @Column({ type: 'varchar', length: 100 })
    customer_id: string;

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
