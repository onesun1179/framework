import { Injectable } from '@nestjs/common';
import { MetadataConstant } from '@common/constants/metadata.constant';
import { UserRepository } from '@modules/user/repository/user.repository';
import { RoleRepository } from '@modules/role/repository/role.repository';
import { LoginUser } from '@modules/user/user.type';
import { UserOutput } from '@modules/user/dto/output/entity/user.output';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private roleRepository: RoleRepository,
  ) {}

  async saveNewMember(loginUser: LoginUser): Promise<UserOutput> {
    const role = await this.roleRepository
      .createQueryBuilder('r')
      .where(`r.identifier = :identifier`, {
        identifier: MetadataConstant.guestId,
      })
      .getOneOrFail();

    return await this.userRepository.save(
      UserOutput.create({
        id: loginUser.id,
        roleSeqNo: role.seqNo,
      }),
    );
  }
}
