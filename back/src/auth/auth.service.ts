import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@modules/user/user.service';
import { LoginUser } from '@modules/user/user.type';
import { AccessToken } from './interfaces/AccessToken';
import { User } from '@modules/user/models/user';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}
  private readonly logger = new Logger(AuthService.name);

  async login(loginUser: LoginUser) {
    const user = await User.findOneBy({
      id: loginUser.id,
    }).then(async (u) => {
      if (!u) {
        return await this.userService.saveNewMember(loginUser);
      } else {
        return u;
      }
    });

    this.logger.log('user', JSON.stringify(user));
    return {
      access_token: this.jwtService.sign({
        googleAccessToken: loginUser.accessToken,
        userId: user.id,
      } as AccessToken),
    };
  }
}
