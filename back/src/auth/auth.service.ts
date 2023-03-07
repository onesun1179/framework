import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUser } from '../user/user.type';
import { UserService } from '../user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from './model/Auth';

import { AccessToken } from './model/AccessToken';
import { AuthGroup } from './model/AuthGroup';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
    @InjectRepository(AuthGroup)
    private authGroupRepository: Repository<AuthGroup>,
  ) {}
  private readonly logger = new Logger(AuthService.name);

  async login(loginUser: LoginUser) {
    this.logger.log('loginUser', loginUser);
    const user = await this.userService
      .getUserRepository()
      .findOneBy({
        id: loginUser.id,
      })
      .then(async (u) => {
        if (!u) {
          return await this.userService.saveLoginUser(loginUser);
        } else {
          return u;
        }
      });

    this.logger.log('user', JSON.stringify(user));
    return {
      access_token: this.jwtService.sign({
        authSeqNo: user.auth.seqNo,
        userId: user.id,
      } as AccessToken),
    };
  }

  getAuthRepository() {
    return this.authRepository;
  }

  getAuthGroupRepository() {
    return this.authGroupRepository;
  }
}
