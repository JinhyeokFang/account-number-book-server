import { Controller, Get, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import KakaoGuard from './guards/kakao.guard';
import Payload from './payload';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Get('/login')
    @UseGuards(KakaoGuard)
    async login() {
        return HttpStatus.OK;
    }

    @Get('/redirect')
    @UseGuards(KakaoGuard)
    async redirect(@Req() request) {
        const token = await this.authService.login(request.user as Payload);
        return { token };
    }
}
