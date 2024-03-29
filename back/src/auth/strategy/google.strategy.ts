import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.OAUTH_GOOGLE_ID,
      clientSecret: process.env.OAUTH_GOOGLE_SECRET,
      callbackURL: process.env.OAUTH_GOOGLE_REDIRECT,
      scope: ['email', 'profile'],
    });
  }

  validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    console.log(profile);
    const { id, displayName, emails } = profile;

    const email = emails?.[0]?.value;
    done(null, {
      displayName,
      email,
      id,
      accessToken,
      refreshToken,
    });
  }
}
