import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUser } from '../user/user.type';
import { UserService } from '../user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from './model/Auth';

import { AccessToken } from './model/AccessToken';
import { INITIAL_AUTH_LIST } from './auth.constant';
import { AuthGroup } from './model/AuthGroup';
import { Builder } from 'builder-pattern';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    @InjectRepository(Auth)
    private authEntityRepository: Repository<Auth>,
    @InjectRepository(AuthGroup)
    private authGroupRepository: Repository<AuthGroup>,
  ) {}
  private readonly logger = new Logger(AuthService.name);

  async whenDbInit() {
    const authGroup = await Builder(AuthGroup, {
      name: '조직명',
    })
      .build()
      .save();
    await Promise.all(
      INITIAL_AUTH_LIST.map((o) => {
        o.authGroup = authGroup;
        return (async () => {
          await o.save();
        })();
      }),
    );
  }

  async save(authEntity: Auth[]) {
    return this.authEntityRepository.save(authEntity);
  }

  async login(loginUser: LoginUser) {
    this.logger.log('loginUser', loginUser);
    const user = await this.userService
      .getUser(loginUser.id)
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
        authId: user.auth.id,
        userId: user.id,
      } as AccessToken),
    };
  }

  async getAuthList(): Promise<Auth[]> {
    return await this.authEntityRepository.find();
  }

  async getAuthEntityById(id: Auth['id']): Promise<Auth> {
    return await this.authEntityRepository.findOneBy({
      id,
    });
  }

  async getAuthEntityByIdentifier(identifier: Auth['identifier']) {
    return await this.authEntityRepository.findOneBy({
      identifier,
    });
  }
}
