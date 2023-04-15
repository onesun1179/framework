import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { RoleFrontComponentMapEntity } from '@modules/role/entity/role-front-component-map.entity';
import { RoleFrontComponentMapRepository } from '@modules/role/repository/role-front-component-map.repository';
import { RoleEntity } from '@modules/role/entity/role.entity';
import { FrontComponentEntity } from '@modules/front-component/entity/front-component.entity';
import { AllFrontComponentEntity } from '@modules/front-component/entity/all-front-component.entity';

@Resolver(() => RoleFrontComponentMapEntity)
export class RoleFrontComponentMapResolver {
  private readonly logger = new Logger(RoleFrontComponentMapResolver.name);

  constructor(
    private roleFrontComponentMapRepository: RoleFrontComponentMapRepository,
  ) {}

  @Query(() => RoleFrontComponentMapEntity, {
    nullable: true,
  })
  async roleFrontComponentMap(
    @Args('roleSeqNo', { type: () => Int }) roleSeqNo: number,
    @Args('frontComponentId', { type: () => String })
    frontComponentId: string,
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
