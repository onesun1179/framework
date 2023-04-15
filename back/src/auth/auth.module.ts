import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from './auth.constant';
import { GoogleAuthController } from '@auth/controller';
import { GoogleStrategy, JwtStrategy } from '@auth/strategy';
import { GqlAuthGuard } from '@auth/guard';
import { AuthService } from './auth.service';
import { UserModule } from '@modules/user/user.module';
import { AuthResolver } from '@auth/resolvers';

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
  providers: [
    AuthService,
    JwtStrategy,
    GqlAuthGuard,
    GoogleStrategy,
    AuthResolver,
  ],
})
export class AuthModule {}
