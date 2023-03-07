import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './models/User';
import { LoginUser } from './user.type';
import { Builder } from 'builder-pattern';
import { GUEST_AUTH } from '../auth/auth.constant';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    private authService: AuthService,
  ) {}

  getUserRepository() {
    return this.userRepository;
  }

  // async whenDbInit() {
  //   const developerAuth = await this.authService.getAuthEntityByIdentifier(
  //     DEVELOPER_AUTH.identifier,
  //   );
  //   // 이동원
  //   await Builder(User, {
  //     id: '102494101026679318764',
  //     auth: developerAuth,
  //   })
  //     .build()
  //     .save();
  // }

  async saveLoginUser(loginUser: LoginUser) {
    const guestAuth = await this.authService.getAuthRepository().findOneBy({
      identifier: GUEST_AUTH.identifier,
    });
    return await this.userRepository.save(
      Builder(User, {
        ...loginUser,
        auth: guestAuth,
      }).build(),
    );
  }
}
