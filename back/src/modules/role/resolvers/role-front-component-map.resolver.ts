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
import { FrontComponent } from '@modules/front-component/model/front-component';
import { RoleFrontComponentMap } from '@modules/role/model/role-front-component-map';
import { AllFrontComponent } from '@modules/front-component/model/all-front-component';

@Resolver(() => RoleFrontComponentMap)
export class RoleFrontComponentMapResolver {
  constructor(private roleService: RoleService) {}
  private readonly logger = new Logger(RoleFrontComponentMapResolver.name);
  @Query(() => RoleFrontComponentMap, {
    nullable: true,
  })
  async roleFrontComponentMap(
    @Args('roleSeqNo', { type: () => Int }) roleSeqNo: Role['seqNo'],
    @Args('frontComponentSeqNo', { type: () => Int })
    frontComponentSeqNo: FrontComponent['seqNo'],
  ): Promise<RoleFrontComponentMap> {
    return await RoleFrontComponentMap.findOneBy({
      roleSeqNo,
      frontComponentSeqNo,
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
    @Parent() { frontComponentSeqNo }: RoleFrontComponentMap,
  ): Promise<FrontComponent> {
    return await FrontComponent.findOneBy({
      seqNo: frontComponentSeqNo,
    });
  }

  @ResolveField(() => AllFrontComponent)
  async allFrontComponent(
    @Parent() { allFrontComponentSeqNo }: RoleFrontComponentMap,
  ): Promise<AllFrontComponent> {
    return await AllFrontComponent.findOneBy({
      seqNo: allFrontComponentSeqNo,
    });
  }
}
