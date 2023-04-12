import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user';
import { UserResolver } from './resolvers/user.resolver';
import { UserRepository } from '@modules/user/repositories/user.repository';
import { TypeOrmExModule } from '@common/modules/TypeOrmExModule';
import { RoleRepository } from '@modules/role/repositories/role.repository';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([UserRepository, RoleRepository]),
    TypeOrmModule.forFeature([User]),
  ],
  exports: [UserService],
  providers: [UserService, UserResolver],
})
export class UserModule {}
