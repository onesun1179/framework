import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../modules/user/user.service';
import { LoginUser } from '../modules/user/user.type';
import { AccessToken } from './interfaces/AccessToken';
import { RoleService } from '../modules/role/role.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private roleService: RoleService,
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
        roleSeqNo: user.role.seqNo,
        userId: user.id,
      } as AccessToken),
    };
  }
}
