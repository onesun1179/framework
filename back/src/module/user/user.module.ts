import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from '@common/module/TypeOrmExModule';
import { UserRepository } from '@modules/user/repository/user.repository';
import { RoleRepository } from '@modules/role/repository/role.repository';
import { UserOutput } from '@modules/user/dto/output/entity/user.output';
import { UserService } from '@modules/user/user.service';
import { UserResolver } from '@modules/user/resolver/user.resolver';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([UserRepository, RoleRepository]),
    TypeOrmModule.forFeature([UserOutput]),
  ],
  exports: [UserService],
  providers: [UserService, UserResolver],
})
export class UserModule {}
