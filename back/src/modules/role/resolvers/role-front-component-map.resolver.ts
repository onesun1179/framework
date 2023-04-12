import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Role } from '../entities/role.entity';
import { Logger } from '@nestjs/common';
import { FrontComponent } from '@modules/front-component/entities/front-component.entity';
import { RoleFrontComponentMap } from '@modules/role/entities/role-front-component-map.entity';
import { AllFrontComponent } from '@modules/front-component/entities/all-front-component.entity';
import { RoleFrontComponentMapRepository } from '@modules/role/repositories/role-front-component-map.repository';

@Resolver(() => RoleFrontComponentMap)
export class RoleFrontComponentMapResolver {
  constructor(
    private roleFrontComponentMapRepository: RoleFrontComponentMapRepository,
  ) {}
  private readonly logger = new Logger(RoleFrontComponentMapResolver.name);
  @Query(() => RoleFrontComponentMap, {
    nullable: true,
  })
  async roleFrontComponentMap(
    @Args('roleSeqNo', { type: () => Int }) roleSeqNo: Role['seqNo'],
    @Args('frontComponentId', { type: () => String })
    frontComponentId: FrontComponent['id'],
  ): Promise<RoleFrontComponentMap | null> {
    return await this.roleFrontComponentMapRepository.findOneBy({
      roleSeqNo,
      frontComponentId,
    });
  }
  @ResolveField(() => Role)
  async role(@Parent() { roleSeqNo }: RoleFrontComponentMap): Promise<Role> {
    return await Role.findOneByOrFail({
      seqNo: roleSeqNo,
    });
  }

  @ResolveField(() => FrontComponent)
  async frontComponent(
    @Parent() { frontComponentId }: RoleFrontComponentMap,
  ): Promise<FrontComponent> {
    return await FrontComponent.findOneByOrFail({
      id: frontComponentId,
    });
  }

  @ResolveField(() => AllFrontComponent)
  async allFrontComponent(
    @Parent() { allFrontComponentId }: RoleFrontComponentMap,
  ): Promise<AllFrontComponent> {
    return await AllFrontComponent.findOneByOrFail({
      id: allFrontComponentId,
    });
  }
}
