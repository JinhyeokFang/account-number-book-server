import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async create(user: User): Promise<void> {
        await this.userRepository.save(user);
    }

    async findOne(kakaoId: string): Promise<User> {
        return this.userRepository.findOneBy({ kakaoId });
    }

    async remove(kakaoId: string): Promise<void> {
        await this.userRepository.delete(kakaoId);
    }
}
