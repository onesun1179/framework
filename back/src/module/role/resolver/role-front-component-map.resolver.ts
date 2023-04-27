import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { RoleFrontComponentMapOutput } from '@modules/role/dto/output/entity/role-front-component-map.output';
import { RoleFrontComponentMapRepository } from '@modules/role/repository/role-front-component-map.repository';
import { RoleOutput } from '@modules/role/dto/output/entity/role.output';
import { FrontComponentOutput } from '@modules/front-component/dto/output/entity/front-component.output';
import { AllFrontComponentOutput } from '@modules/front-component/dto/output/entity/all-front-component.output';
import { AllFrontComponentRepository } from '@modules/front-component/repository/all-front-component.repository';
import { FrontComponentRepository } from '@modules/front-component/repository/front-component.repository';
import { RoleRepository } from '@modules/role/repository/role.repository';
import { GqlError } from '@common/error/GqlError';
import { MessageConstant } from '@common/constants/message.constant';

@Resolver(() => RoleFrontComponentMapOutput)
export class RoleFrontComponentMapResolver {
  private readonly logger = new Logger(RoleFrontComponentMapResolver.name);

  constructor(
    private roleEntityRepository: RoleRepository,
    private frontComponentEntityRepository: FrontComponentRepository,
    private allFrontComponentEntityRepository: AllFrontComponentRepository,
    private roleFrontComponentMapRepository: RoleFrontComponentMapRepository,
  ) {}

  /**************************************
   *              QUERY
   ***************************************/
  @Query(() => RoleFrontComponentMapOutput, {
    nullable: true,
  })
  async roleFrontComponentMap(
    @Args('roleSeqNo', { type: () => Int }) roleSeqNo: number,
    @Args('frontComponentId', { type: () => String })
    frontComponentId: string,
  ): Promise<RoleFrontComponentMapOutput | null> {
    return await this.roleFrontComponentMapRepository.findOneBy({
      roleSeqNo,
      frontComponentId,
    });
  }

  /**************************************
   *           RESOLVE_FIELD
   ***************************************/

  @ResolveField(() => RoleOutput)
  async role(
    @Parent() { roleSeqNo }: RoleFrontComponentMapOutput,
  ): Promise<RoleOutput> {
    return await this.roleEntityRepository.findOneByOrFail({
      seqNo: roleSeqNo,
    });
  }

  @ResolveField(() => FrontComponentOutput)
  async frontComponent(
    @Parent() { frontComponentId }: RoleFrontComponentMapOutput,
  ): Promise<FrontComponentOutput> {
    return await this.frontComponentEntityRepository.findOneByOrFail({
      id: frontComponentId,
    });
  }

  @ResolveField(() => AllFrontComponentOutput)
  async allFrontComponent(
    @Parent() { allFrontComponentId }: RoleFrontComponentMapOutput,
  ): Promise<AllFrontComponentOutput> {
    return await this.allFrontComponentEntityRepository.findOneByOrFail({
      id: allFrontComponentId,
    });
  }
  /**************************************
   *           MUTATION
   ***************************************/
  @Mutation(() => RoleFrontComponentMapOutput)
  async updateAllFrontComponentByRoleFrontComponentMap(
    @Args({
      name: 'roleSeqNo',
      type: () => Int,
    })
    roleSeqNo: number,
    @Args({
      name: 'frontComponentId',
      type: () => String,
    })
    frontComponentId: string,
    @Args({
      name: 'allFrontComponentId',
      type: () => String,
    })
    allFrontComponentId: string,
  ): Promise<RoleFrontComponentMapOutput> {
    const allFrontComponent =
      await this.allFrontComponentEntityRepository.findOneByOrFail({
        id: allFrontComponentId,
      });

    if (!allFrontComponent.frontComponentId) {
      throw new GqlError(MessageConstant.NOT_FOUND_VALUE([]));
    }

    return await this.roleFrontComponentMapRepository.save(
      RoleFrontComponentMapOutput.create({
        roleSeqNo,
        frontComponentId,
        allFrontComponentId,
      }),
    );
  }
}
