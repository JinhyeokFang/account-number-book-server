import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryColumn()
    kakaoId: string;

    @Column({ default: 'unnamed' })
    name: string;
}
