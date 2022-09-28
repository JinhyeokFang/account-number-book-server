import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Account {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    kakaoId: string;

    @Column()
    accountNumber: string;

    @Column()
    accountBankName: string;

    @Column()
    accountOwnerName: string;
}
