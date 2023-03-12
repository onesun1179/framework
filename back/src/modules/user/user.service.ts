import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './models/user';
import { LoginUser } from './user.type';
import { Builder } from 'builder-pattern';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
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
    return await this.userRepository.save(
      Builder(User, {
        ...loginUser,
      }).build(),
    );
  }
}
