import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ACCESS_TOKEN_COOKIE_NAME, JWT_SECRET } from '@auth';
import { AccessToken } from '@auth/interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          const data = request?.cookies[ACCESS_TOKEN_COOKIE_NAME];
          if (!data) {
            return null;
          }
          return data;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
    });
  }

  async validate(payload: AccessToken | null) {
    if (payload === null) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}
