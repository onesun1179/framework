import { Injectable } from '@nestjs/common';
import { MetadataConstant } from '@common/constants/metadata.constant';
import { UserEntityRepository } from '@modules/user/repository/user-entity.repository';
import { RoleEntityRepository } from '@modules/role/repository/role-entity.repository';
import { LoginUser } from '@modules/user/user.type';
import { UserEntity } from '@modules/user/entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserEntityRepository,
    private roleRepository: RoleEntityRepository,
  ) {}

  async saveNewMember(loginUser: LoginUser): Promise<UserEntity> {
    const role = await this.roleRepository
      .createQueryBuilder('r')
      .where(`r.identifier = :identifier`, {
        identifier: MetadataConstant.guestId,
      })
      .getOneOrFail();

    return await this.userRepository.save(
      UserEntity.create({
        id: loginUser.id,
        roleSeqNo: role.seqNo,
      }),
    );
  }
}
