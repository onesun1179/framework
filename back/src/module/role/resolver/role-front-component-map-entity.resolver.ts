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
import { RoleFrontComponentMapEntity } from '@modules/role/dto/output/entity/role-front-component-map.entity';
import { RoleFrontComponentMapEntityRepository } from '@modules/role/repository/role-front-component-map-entity.repository';
import { RoleEntity } from '@modules/role/dto/output/entity/role.entity';
import { FrontComponentEntity } from '@modules/front-component/dto/output/entity/front-component.entity';
import { AllFrontComponentEntity } from '@modules/front-component/dto/output/entity/all-front-component.entity';
import { AllFrontComponentEntityRepository } from '@modules/front-component/repository/all-front-component-entity.repository';
import { FrontComponentEntityRepository } from '@modules/front-component/repository/front-component-entity.repository';
import { RoleEntityRepository } from '@modules/role/repository/role-entity.repository';
import { GqlError } from '@common/error/GqlError';
import { MessageConstant } from '@common/constants/message.constant';

@Resolver(() => RoleFrontComponentMapEntity)
export class RoleFrontComponentMapEntityResolver {
  private readonly logger = new Logger(
    RoleFrontComponentMapEntityResolver.name,
  );

  constructor(
    private roleEntityRepository: RoleEntityRepository,
    private frontComponentEntityRepository: FrontComponentEntityRepository,
    private allFrontComponentEntityRepository: AllFrontComponentEntityRepository,
    private roleFrontComponentMapRepository: RoleFrontComponentMapEntityRepository,
  ) {}

  /**************************************
   *              QUERY
   ***************************************/
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

  /**************************************
   *           RESOLVE_FIELD
   ***************************************/

  @ResolveField(() => RoleEntity)
  async role(
    @Parent() { roleSeqNo }: RoleFrontComponentMapEntity,
  ): Promise<RoleEntity> {
    return await this.roleEntityRepository.findOneByOrFail({
      seqNo: roleSeqNo,
    });
  }

  @ResolveField(() => FrontComponentEntity)
  async frontComponent(
    @Parent() { frontComponentId }: RoleFrontComponentMapEntity,
  ): Promise<FrontComponentEntity> {
    return await this.frontComponentEntityRepository.findOneByOrFail({
      id: frontComponentId,
    });
  }

  @ResolveField(() => AllFrontComponentEntity)
  async allFrontComponent(
    @Parent() { allFrontComponentId }: RoleFrontComponentMapEntity,
  ): Promise<AllFrontComponentEntity> {
    return await this.allFrontComponentEntityRepository.findOneByOrFail({
      id: allFrontComponentId,
    });
  }
  /**************************************
   *           MUTATION
   ***************************************/
  @Mutation(() => RoleFrontComponentMapEntity)
  async updateAllFrontComponentByRoleFrontComponentMapEntity(
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
  ): Promise<RoleFrontComponentMapEntity> {
    const allFrontComponent =
      await this.allFrontComponentEntityRepository.findOneByOrFail({
        id: allFrontComponentId,
      });

    if (!allFrontComponent.frontComponentId) {
      throw new GqlError(MessageConstant.NOT_FOUND_VALUE([]));
    }

    return await this.roleFrontComponentMapRepository.save(
      RoleFrontComponentMapEntity.create({
        roleSeqNo,
        frontComponentId,
        allFrontComponentId,
      }),
    );
  }
}
