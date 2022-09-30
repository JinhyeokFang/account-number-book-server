import { AuthGuard } from '@nestjs/passport';

export default class KakaoGuard extends AuthGuard('kakao') {}
