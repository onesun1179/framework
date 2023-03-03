import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategy/google.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthTreeEntity } from './entity/authTree.entity';
import { AuthEntity } from './entity/auth.entity';
import { JWT_SECRET } from './auth.constant';
import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from './strategy/jwt.strategy';
import { GqlAuthGuard } from './guard/gql-auth.guard';

// @Global()
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '1day' },
    }),
    UserModule,
    TypeOrmModule.forFeature([AuthEntity, AuthTreeEntity]),
  ],
  exports: [AuthService],
  controllers: [AuthController],
  providers: [
    AuthService,
    GoogleStrategy,
    AuthResolver,
    JwtStrategy,
    GqlAuthGuard,
  ],
})
export class AuthModule {}
