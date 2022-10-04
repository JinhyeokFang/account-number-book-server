import {
    Controller,
    Get,
    HttpStatus,
    Redirect,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import KakaoGuard from './guards/kakao.guard';
import Payload from './payload';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private configService: ConfigService,
    ) {}

    @Get('/login')
    @UseGuards(KakaoGuard)
    async login() {
        return HttpStatus.OK;
    }

    @Get('/redirect')
    @UseGuards(KakaoGuard)
    @Redirect('https://url.jinhy.uk', 302)
    async redirect(@Req() request, @Res({ passthrough: true }) response) {
        const token = await this.authService.login(request.user as Payload);
        response.cookie('token', token);
        return {
            url: this.configService.get('REDIRECT_URL'),
        };
    }

    @Get('/token')
    async getToken(@Req() request) {
        const cookieData: string | undefined = request.cookies['token'];
        return {
            data: cookieData === undefined ? null : cookieData,
        };
    }
}
