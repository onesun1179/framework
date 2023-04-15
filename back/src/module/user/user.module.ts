import { Module } from '@nestjs/common';
import { UserService } from '@modules/user';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@modules/user/entity';
import { UserResolver } from '@modules/user/resolver';
import { UserRepository } from '@modules/user/repository';
import { TypeOrmExModule } from '@common/module/TypeOrmExModule';
import { RoleRepository } from '@modules/role/repository';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([UserRepository, RoleRepository]),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  exports: [UserService],
  providers: [UserService, UserResolver],
})
export class UserModule {}
