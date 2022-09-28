import { Module } from '@nestjs/common';
import { AccountNumberService } from './account-number.service';
import { AccountNumberController } from './account-number.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/entities/account.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Account])],
    providers: [AccountNumberService],
    controllers: [AccountNumberController],
})
export class AccountNumberModule {}
