import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUser } from '../user/user.type';
import { UserService } from '../user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthEntity } from './entity/auth.entity';
import { AuthTreeEntity } from './entity/authTree.entity';
import { Auth } from './model/auth.model';
import { AccessToken } from './model/accessToken.model';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    @InjectRepository(AuthEntity)
    private authEntityRepository: Repository<AuthEntity>,
    @InjectRepository(AuthTreeEntity)
    private authTreeEntityRepository: Repository<AuthTreeEntity>,
  ) {}
  private readonly logger = new Logger(AuthService.name);

  async save(authEntity: AuthEntity[]) {
    return this.authEntityRepository.save(authEntity);
  }

  async login(loginUser: LoginUser) {
    const user = await this.userService
      .getUser(loginUser.id)
      .then(async (u) => {
        if (!u) {
          return await this.userService.saveByLoginUser(loginUser);
        } else {
          return u;
        }
      });

    this.logger.log(JSON.stringify(user));
    return {
      access_token: this.jwtService.sign({
        authId: user.auth.id,
        userId: user.id,
      } as AccessToken),
    };
  }

  async getAuthList(): Promise<Auth[]> {
    const o = await this.authEntityRepository.find();

    return o.map((oo) => oo.toAuth());
  }

  async getAuthEntityById(id: AuthEntity['id']): Promise<AuthEntity> {
    return await this.authEntityRepository.findOneBy({
      id,
    });
  }

  async getAuthEntityByIdentifier(identifier: AuthEntity['identifier']) {
    const t = await this.authEntityRepository.find();
    const a = await this.authEntityRepository.findOneBy({
      identifier,
    });
    return a;
  }
}
