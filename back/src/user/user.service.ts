import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/User';
import { LoginUser } from './user.type';
import { Builder } from 'builder-pattern';
import { DEVELOPER_AUTH, GUEST_AUTH } from '../auth/auth.constant';
import { AuthService } from '../auth/auth.service';
import { WhenDbInit } from '../common/types/WhenDbInit';

@Injectable()
export class UserService implements WhenDbInit {
  constructor(
    @InjectRepository(User)
    private userEntityRepository: Repository<User>,

    private authService: AuthService,
  ) {}

  async whenDbInit() {
    const developerAuth = await this.authService.getAuthEntityByIdentifier(
      DEVELOPER_AUTH.identifier,
    );
    // 이동원
    await Builder(User, {
      id: '102494101026679318764',
      auth: developerAuth,
    })
      .build()
      .save();
  }

  saveList(userEntity: User[]) {
    return this.userEntityRepository.save(userEntity);
  }

  getUser(id: User['id']) {
    return this.userEntityRepository.findOne({
      where: {
        id,
      },
      relations: {
        auth: true,
      },
    });
  }

  async saveLoginUser(loginUser: LoginUser) {
    const guestAuth = await this.authService.getAuthEntityByIdentifier(
      GUEST_AUTH.identifier,
    );
    return await this.userEntityRepository.save(
      Builder(User, {
        ...loginUser,
        auth: guestAuth,
      }).build(),
    );
  }
}
