import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { LoginUser } from './user.type';
import { Builder } from 'builder-pattern';
import { GUEST_AUTH } from '../auth/auth.constant';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userEntityRepository: Repository<UserEntity>,
  ) {}

  saveList(userEntity: UserEntity[]) {
    return this.userEntityRepository.save(userEntity);
  }

  getUser(id: UserEntity['id']) {
    return this.userEntityRepository.findOneBy({
      id,
    });
  }

  saveByLoginUser(loginUser: LoginUser) {
    return this.userEntityRepository.save(
      Builder(UserEntity, {
        ...loginUser,
        auth: GUEST_AUTH,
      }).build(),
    );
  }
}
