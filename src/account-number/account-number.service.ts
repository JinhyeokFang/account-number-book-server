import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/entities/account.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AccountNumberService {
    constructor(
        @InjectRepository(Account)
        private accountNumberRepository: Repository<Account>,
    ) {}

    async create(account: Account): Promise<void> {
        await this.accountNumberRepository.save(account);
    }

    async findAccount(id: string): Promise<Account> {
        return this.accountNumberRepository.findOneBy({ id });
    }

    async findAllAccounts(kakaoId: string): Promise<Account[]> {
        return this.accountNumberRepository.findBy({ kakaoId });
    }

    async remove(id: number): Promise<void> {
        await this.accountNumberRepository.delete(id);
    }
}
