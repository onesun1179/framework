import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { GoogleStrategy } from './strategy/google.strategy';
import { GoogleAuthController } from './controller/google-auth.controller';
import { AuthService } from './auth.service';
import { Auth } from './model/Auth';
import { JWT_SECRET } from './auth.constant';
import { AuthResolver } from './resolvers/auth.resolver';
import { JwtStrategy } from './strategy/jwt.strategy';
import { GqlAuthGuard } from './guard/gql-auth.guard';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthGroup } from './model/AuthGroup';

@Global()
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '1day' },
    }),
    UserModule,
    TypeOrmModule.forFeature([Auth, AuthGroup]),
  ],
  exports: [AuthService],
  controllers: [AuthController, GoogleAuthController],
  providers: [
    AuthService,
    AuthResolver,
    JwtStrategy,
    GqlAuthGuard,
    GoogleStrategy,
  ],
})
export class AuthModule {}
