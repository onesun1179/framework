import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { RoleEntity, RoleFrontComponentMapEntity } from '@modules/role/entity';
import { Logger } from '@nestjs/common';
import {
  AllFrontComponentEntity,
  FrontComponentEntity,
} from '@modules/front-component/entity';
import { RoleFrontComponentMapRepository } from '@modules/role/repository';

@Resolver(() => RoleFrontComponentMapEntity)
export class RoleFrontComponentMapResolver {
  constructor(
    private roleFrontComponentMapRepository: RoleFrontComponentMapRepository,
  ) {}
  private readonly logger = new Logger(RoleFrontComponentMapResolver.name);
  @Query(() => RoleFrontComponentMapEntity, {
    nullable: true,
  })
  async roleFrontComponentMap(
    @Args('roleSeqNo', { type: () => Int }) roleSeqNo: RoleEntity['seqNo'],
    @Args('frontComponentId', { type: () => String })
    frontComponentId: FrontComponentEntity['id'],
  ): Promise<RoleFrontComponentMapEntity | null> {
    return await this.roleFrontComponentMapRepository.findOneBy({
      roleSeqNo,
      frontComponentId,
    });
  }
  @ResolveField(() => RoleEntity)
  async role(
    @Parent() { roleSeqNo }: RoleFrontComponentMapEntity,
  ): Promise<RoleEntity> {
    return await RoleEntity.findOneByOrFail({
      seqNo: roleSeqNo,
    });
  }

  @ResolveField(() => FrontComponentEntity)
  async frontComponent(
    @Parent() { frontComponentId }: RoleFrontComponentMapEntity,
  ): Promise<FrontComponentEntity> {
    return await FrontComponentEntity.findOneByOrFail({
      id: frontComponentId,
    });
  }

  @ResolveField(() => AllFrontComponentEntity)
  async allFrontComponent(
    @Parent() { allFrontComponentId }: RoleFrontComponentMapEntity,
  ): Promise<AllFrontComponentEntity> {
    return await AllFrontComponentEntity.findOneByOrFail({
      id: allFrontComponentId,
    });
  }
}
