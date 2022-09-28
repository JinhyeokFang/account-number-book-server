import { Controller, Get, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import Payload from './payload';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Get('/login')
    @UseGuards(AuthGuard('kakao'))
    async login() {
        return HttpStatus.OK;
    }

    @Get('/redirect')
    @UseGuards(AuthGuard('kakao'))
    async redirect(@Req() request) {
        await this.authService.login(request.user as Payload);
        return HttpStatus.OK;
    }
}
