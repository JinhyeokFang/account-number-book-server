import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { ConfigModule } from '@nestjs/config';
import { KakaoStrategy } from './strategies/kakao.strategy';

@Module({
    imports: [ConfigModule, UserService],
    providers: [AuthService, KakaoStrategy],
    controllers: [AuthController],
})
export class AuthModule {}
