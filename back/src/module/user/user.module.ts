import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from '@common/module/TypeOrmExModule';
import { UserEntityRepository } from '@modules/user/repository/user-entity.repository';
import { RoleEntityRepository } from '@modules/role/repository/role-entity.repository';
import { UserEntity } from '@modules/user/entity/user.entity';
import { UserService } from '@modules/user/user.service';
import { UserEntityResolver } from '@modules/user/resolver/user-entity.resolver';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([
      UserEntityRepository,
      RoleEntityRepository,
    ]),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  exports: [UserService],
  providers: [UserService, UserEntityResolver],
})
export class UserModule {}
