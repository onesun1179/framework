import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { RoleService } from '../role.service';
import { Role } from '../model/role';
import { Logger } from '@nestjs/common';
import { FrontComponent } from '@modules/front-component/entities/front-component.entity';
import { RoleFrontComponentMap } from '@modules/role/model/role-front-component-map';
import { AllFrontComponent } from '@modules/front-component/entities/all-front-component.entity';

@Resolver(() => RoleFrontComponentMap)
export class RoleFrontComponentMapResolver {
  constructor(private roleService: RoleService) {}
  private readonly logger = new Logger(RoleFrontComponentMapResolver.name);
  @Query(() => RoleFrontComponentMap, {
    nullable: true,
  })
  async roleFrontComponentMap(
    @Args('roleSeqNo', { type: () => Int }) roleSeqNo: Role['seqNo'],
    @Args('frontComponentId', { type: () => String })
    frontComponentId: FrontComponent['id'],
  ): Promise<RoleFrontComponentMap> {
    return await RoleFrontComponentMap.findOneBy({
      roleSeqNo,
      frontComponentId,
    });
  }
  @ResolveField(() => Role)
  async role(@Parent() { roleSeqNo }: RoleFrontComponentMap): Promise<Role> {
    return await Role.findOneBy({
      seqNo: roleSeqNo,
    });
  }

  @ResolveField(() => FrontComponent)
  async frontComponent(
    @Parent() { frontComponentId }: RoleFrontComponentMap,
  ): Promise<FrontComponent> {
    return await FrontComponent.findOneBy({
      id: frontComponentId,
    });
  }

  @ResolveField(() => AllFrontComponent)
  async allFrontComponent(
    @Parent() { allFrontComponentId }: RoleFrontComponentMap,
  ): Promise<AllFrontComponent> {
    return await AllFrontComponent.findOneBy({
      id: allFrontComponentId,
    });
  }
}
