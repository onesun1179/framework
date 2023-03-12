import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from './auth.constant';
import { GoogleAuthController } from './controller/google-auth.controller';
import { JwtStrategy } from './strategy/jwt.strategy';
import { GoogleStrategy } from './strategy/google.strategy';
import { GqlAuthGuard } from './guard/gql-auth.guard';
import { AuthService } from './auth.service';
import { UserModule } from '../modules/user/user.module';

@Global()
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '1day' },
    }),
    UserModule,
  ],
  exports: [AuthService],
  controllers: [GoogleAuthController],
  providers: [AuthService, JwtStrategy, GqlAuthGuard, GoogleStrategy],
})
export class AuthModule {}
