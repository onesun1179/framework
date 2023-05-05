import { Injectable } from '@nestjs/common';
import { MetadataConstant } from '@common/constants/metadata.constant';
import { UserRepository } from '@modules/user/repository/user.repository';
import { RoleRepository } from '@modules/role/repository/role.repository';
import { LoginUser } from '@modules/user/user.type';
import { UserOutput } from '@modules/user/dto/output/entity/user.output';
import { InsertUserInput } from '@modules/user/dto/input/insert-user.input';
import { UpdateUserInput } from '@modules/user/dto/input/update-user.input';
import { Builder } from 'builder-pattern';
import { PagingInput } from '@common/dto/input/paging.input';
import { Nullable } from '@common/type';
import { UsersOutput } from '@modules/user/dto/output/users.output';
import { UtilPaging } from '@common/util/Util.paging';
import { UtilSearch } from '@common/util/Util.search';
import { UtilSort } from '@common/util/Util.sort';
import { UsersInput } from '@modules/user/dto/input/users.input';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private roleRepository: RoleRepository,
  ) {}

  async paging(
    pagingInput: Nullable<PagingInput>,
    usersInput: Nullable<UsersInput>,
  ): Promise<UsersOutput> {
    const qb = this.userRepository.createQueryBuilder('user');

    if (usersInput) {
      const { search, sort } = usersInput;

      search && UtilSearch.setSearchByQB(qb, search);
      sort && UtilSort.setSortByQB(qb, sort);
    }

    return await UtilPaging.getRes({
      pagingInput,
      builder: qb,
      classRef: UsersOutput,
    });
  }

  async saveCustom(p: InsertUserInput | UpdateUserInput) {
    return this.userRepository.save(
      UserOutput.create({
        id: p.id,
        roleSeqNo: p.roleSeqNo,
        name: p.name,
        email: p.email,
      }),
    );
  }

  async saveNewMember(loginUser: LoginUser): Promise<UserOutput> {
    const role = await this.roleRepository
      .createQueryBuilder('r')
      .where(`r.identifier = :identifier`, {
        identifier: MetadataConstant.guestId,
      })
      .getOneOrFail();

    return await this.saveCustom(
      Builder(InsertUserInput, {
        id: loginUser.id,
        roleSeqNo: role.seqNo,
        name: loginUser.displayName,
        email: loginUser.email,
      }).build(),
    );
  }
}
