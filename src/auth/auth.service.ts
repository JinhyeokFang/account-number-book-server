import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';
import Payload from './payload';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}

    async login(userPayload: Payload) {
        const user = await this.userService.findOne(userPayload.kakaoId);
        if (user === null) {
            const userEntity = new User();
            userEntity.kakaoId = userPayload.kakaoId;
            userEntity.name = userPayload.name;
            await this.userService.create(userEntity);
        }
    }
}
