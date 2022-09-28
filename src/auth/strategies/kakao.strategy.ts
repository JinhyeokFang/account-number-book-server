import { Strategy } from 'passport-kakao';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Payload from '../payload';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService) {
        const clientID = configService.get('CLIENT_ID');
        const callbackURL = configService.get('CALLBACK_URL');
        super({
            clientID,
            callbackURL,
        });
    }

    async validate(accessToken, refreshToken, rawProfile, done) {
        const profile = rawProfile._json;
        const kakaoId = profile.id;
        const name = profile.kakao_account.profile.nickname;
        const payload: Payload = {
            name,
            kakaoId,
        };
        done(null, payload);
    }
}
