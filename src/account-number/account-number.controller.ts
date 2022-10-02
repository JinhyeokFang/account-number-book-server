import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import Payload from 'src/auth/payload';
import { Account } from 'src/entities/account.entity';
import { AccountNumberService } from './account-number.service';
import CreateAccountDTO from './dtos/create-account.dto';

@Controller('account')
export class AccountNumberController {
    constructor(private accountNumberService: AccountNumberService) {}

    @UseGuards(JwtGuard)
    @Post('/')
    async createAccount(@Req() request, @Body() body: CreateAccountDTO) {
        if (request.user == null)
            throw new HttpException({}, HttpStatus.UNAUTHORIZED);

        const { kakaoId } = request.user as Payload;
        const { accountNumber, accountBankName, accountOwnerName } = body;

        const accountEntity = new Account();
        accountEntity.accountBankName = accountBankName;
        accountEntity.accountNumber = accountNumber;
        accountEntity.accountOwnerName = accountOwnerName;
        accountEntity.kakaoId = kakaoId;

        await this.accountNumberService.create(accountEntity);

        return HttpStatus.OK;
    }

    @UseGuards(JwtGuard)
    @Get('/')
    async getAccounts(@Req() request) {
        if (request.user == null)
            throw new HttpException({}, HttpStatus.UNAUTHORIZED);

        const { kakaoId } = request.user as Payload;

        const accounts = await this.accountNumberService.findAllAccounts(
            kakaoId,
        );

        return accounts;
    }

    @UseGuards(JwtGuard)
    @Delete('/:id')
    async deleteAccount(@Req() request, @Param('id') id) {
        if (request.user == null)
            throw new HttpException({}, HttpStatus.UNAUTHORIZED);

        const { kakaoId } = request.user as Payload;

        const account = await this.accountNumberService.findAccount(id);

        if (account === null) throw new HttpException({}, HttpStatus.NOT_FOUND);
        if (account.kakaoId != kakaoId)
            throw new HttpException({}, HttpStatus.FORBIDDEN);

        await this.accountNumberService.remove(id);

        return HttpStatus.OK;
    }
}
