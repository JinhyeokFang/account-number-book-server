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
}
