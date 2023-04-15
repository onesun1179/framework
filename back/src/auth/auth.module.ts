import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from '@auth/auth.constant';
import { AuthService } from '@auth/auth.service';
import { UserModule } from '@modules/user/user.module';
import { GoogleAuthController } from '@auth/controller/google-auth.controller';
import { JwtStrategy } from '@auth/strategy/jwt.strategy';
import { GqlAuthGuard } from '@auth/guard/gql-auth.guard';
import { GoogleStrategy } from '@auth/strategy/google.strategy';
import { AuthResolver } from '@auth/resolvers/auth.resolver';

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
  controllers: [GoogleAuthController],
  providers: [
    AuthService,
    JwtStrategy,
    GqlAuthGuard,
    GoogleStrategy,
    AuthResolver,
  ],
})
export class AuthModule {}
