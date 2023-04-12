import { Injectable } from '@nestjs/common';
import { User } from './models/user';
import { LoginUser } from './user.type';
import { MetadataConstant } from '@common/constants/metadata.constant';
import { UserRepository } from '@modules/user/repositories/user.repository';
import { RoleRepository } from '@modules/role/repositories/role.repository';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private roleRepository: RoleRepository,
  ) {}

  async saveNewMember(loginUser: LoginUser): Promise<User> {
    const role = await this.roleRepository
      .createQueryBuilder('r')
      .where(`r.identifier = :identifier`, {
        identifier: MetadataConstant.guestId,
      })
      .getOneOrFail();

    return await this.userRepository.save(
      User.create({
        id: loginUser.id,
        roleSeqNo: role.seqNo,
      }),
    );
  }
}
