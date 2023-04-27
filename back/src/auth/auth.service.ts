import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@modules/user/user.service';
import { LoginUser } from '@modules/user/user.type';
import { UserOutput } from '@modules/user/dto/output/entity/user.output';
import { AccessToken } from '@auth/interfaces/AccessToken';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async login(loginUser: LoginUser) {
    const user = await UserOutput.findOneBy({
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
