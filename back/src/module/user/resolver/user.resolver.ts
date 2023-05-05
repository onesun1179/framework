import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { UserOutput } from '@modules/user/dto/output/entity/user.output';
import { UserRepository } from '@modules/user/repository/user.repository';
import { RoleRepository } from '@modules/role/repository/role.repository';
import { RoleOutput } from '@modules/role/dto/output/entity/role.output';
import { InsertUserInput } from '@modules/user/dto/input/insert-user.input';
import { UserService } from '@modules/user/user.service';
import { UpdateUserInput } from '@modules/user/dto/input/update-user.input';
import { UsersOutput } from '@modules/user/dto/output/users.output';
import { PagingInput } from '@common/dto/input/paging.input';
import { UsersInput } from '@modules/user/dto/input/users.input';

@Resolver(() => UserOutput)
export class UserResolver {
  logger = new Logger(UserResolver.name);

  constructor(
    private userRepository: UserRepository,
    private userService: UserService,
    private roleRepository: RoleRepository,
  ) {}

  /**************************************
   *              QUERY
   ***************************************/
  @Query(() => UserOutput)
  async user(
    @Args('id', {
      type: () => String,
    })
    id: string,
  ) {
    return await this.userRepository.findOneByOrFail({
      id,
    });
  }

  @Query(() => UsersOutput)
  async users(
    @Args('pagingInput', {
      type: () => PagingInput,
      nullable: true,
    })
    pagingInput: PagingInput,
    @Args('usersInput', {
      type: () => UsersInput,
      nullable: true,
    })
    usersInput: UsersInput,
  ) {
    return await this.userService.paging(pagingInput, usersInput);
  }

  /**************************************
   *           RESOLVE_FIELD
   ***************************************/
  @ResolveField(() => RoleOutput)
  async role(@Parent() { roleSeqNo }: UserOutput): Promise<RoleOutput> {
    return await this.roleRepository.findOneByOrFail({
      seqNo: roleSeqNo,
    });
  }

  /**************************************
   *           MUTATION
   ***************************************/
  @Mutation(() => UserOutput)
  async insertUser(
    @Args('insertUserInput', {
      type: () => InsertUserInput,
    })
    insertUserInput: InsertUserInput,
  ): Promise<UserOutput> {
    return this.userService.saveCustom(insertUserInput);
  }

  @Mutation(() => UserOutput)
  async updateUser(
    @Args('updateUserInput', {
      type: () => UpdateUserInput,
    })
    updateUserInput: UpdateUserInput,
  ): Promise<UserOutput> {
    return this.userService.saveCustom(updateUserInput);
  }
}
