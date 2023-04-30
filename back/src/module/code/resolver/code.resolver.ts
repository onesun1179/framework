import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@auth/guard/gql-auth.guard';
import { CodeRepository } from '@modules/code/repository/code.repository';
import { CodeMapRepository } from '@modules/code/repository/code-map.repository';
import { CodeOutput } from '@modules/code/dto/output/entity/code.output';
import { CodesOutput } from '@modules/code/dto/output/codes.output';
import { PagingInput } from '@common/dto/input/paging.input';
import { CodesInput } from '@modules/code/dto/input/codes.input';
import { UtilSearch } from '@common/util/Util.search';
import { UtilSort } from '@common/util/Util.sort';
import { UtilPaging } from '@common/util/Util.paging';
import { InsertCodeInput } from '@modules/code/dto/input/insert-code.input';
import { UpdateCodeInput } from '@modules/code/dto/input/update-code.input';
import { GqlError } from '@common/error/GqlError';
import { MessageConstant } from '@common/constants/message.constant';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { CodeService } from '@modules/code/code.service';
import { Nullable } from '@common/type';

@Resolver(() => CodeOutput)
@UseGuards(GqlAuthGuard)
export class CodeResolver {
  constructor(
    private codeRepository: CodeRepository,
    private codeMapRepository: CodeMapRepository,
    private codeService: CodeService,
  ) {}

  /**************************************
   *              QUERY
   ***************************************/

  @Query(() => CodesOutput)
  async parentCodes(
    @Args('seqNo', {
      type: () => Int,
    })
    seqNo: number,
    @Args('pagingInput', {
      type: () => PagingInput,
      nullable: true,
    })
    pagingInput?: Nullable<PagingInput>,
  ): Promise<CodesOutput> {
    return await this.codeService.parentCodes(seqNo, pagingInput);
  }

  @Query(() => CodesOutput)
  async childCodes(
    @Args('seqNo', {
      type: () => Int,
    })
    seqNo: number,
    @Args('pagingInput', {
      type: () => PagingInput,
      nullable: true,
    })
    pagingInput?: Nullable<PagingInput>,
  ): Promise<CodesOutput> {
    return await this.codeService.childCodes(seqNo, pagingInput);
  }
  @Query(() => CodesOutput)
  async nonChildCodes(
    @Args('seqNo', {
      type: () => Int,
    })
    seqNo: number,
  ): Promise<CodesOutput> {
    return this.codeService.nonChildCodes(seqNo);
  }
  @Query(() => CodeOutput)
  async code(
    @Args('seqNo', {
      type: () => Int,
    })
    seqNo: number,
  ): Promise<CodeOutput> {
    return await this.codeRepository.findOneByOrFail({
      seqNo,
    });
  }

  @Query(() => CodesOutput)
  async codes(
    @Args('pagingInput', {
      type: () => PagingInput,
      nullable: true,
    })
    pagingInput: PagingInput,
    @Args('codesInput', {
      type: () => CodesInput,
      nullable: true,
    })
    codesInput: CodesInput,
  ): Promise<CodesOutput> {
    const qb = await this.codeRepository.createQueryBuilder('cd');
    let where: FindOptionsWhere<CodeOutput> = {};

    if (codesInput.search) {
      where = UtilSearch.getSearchWhere(codesInput.search);

      if (codesInput.search.parent) {
        where = {
          ...where,
          children: {
            parent: UtilSearch.getSearchWhere(codesInput.search.parent),
          },
        };
      }

      qb.setFindOptions({
        where,
      });
    }

    codesInput.sort && UtilSort.setSortByQB(qb, codesInput.sort);
    return UtilPaging.getRes({
      pagingInput,
      builder: qb,
      classRef: CodesOutput,
    });
  }

  /**************************************
   *           RESOLVE_FIELD
   ***************************************/
  @ResolveField(() => CodesOutput)
  async parents(
    @Parent() { seqNo }: CodeOutput,
    @Args('pagingInput', {
      type: () => PagingInput,
      nullable: true,
    })
    pagingInput?: Nullable<PagingInput>,
  ): Promise<CodesOutput> {
    return this.codeService.parentCodes(seqNo, pagingInput);
  }

  @ResolveField(() => CodesOutput)
  async children(
    @Parent() { seqNo }: CodeOutput,
    @Args('pagingInput', {
      type: () => PagingInput,
      nullable: true,
    })
    pagingInput?: Nullable<PagingInput>,
  ): Promise<CodesOutput> {
    return await this.codeService.childCodes(seqNo, pagingInput);
  }

  /**************************************
   *           MUTATION
   ***************************************/
  @Mutation(() => CodeOutput)
  async insertCode(
    @Args('insertCodeInput', {
      type: () => InsertCodeInput,
    })
    insertCodeInput: InsertCodeInput,
  ): Promise<CodeOutput> {
    return await this.codeService.saveCodeCustom(insertCodeInput);
  }

  @Mutation(() => CodeOutput)
  async updateCode(
    @Args('updateCodeInput', {
      type: () => UpdateCodeInput,
    })
    updateCodeInput: UpdateCodeInput,
  ): Promise<CodeOutput> {
    if (await this.codeRepository.hasRow(updateCodeInput.seqNo)) {
      return await this.codeService.saveCodeCustom(updateCodeInput);
    } else {
      throw new GqlError(MessageConstant.NOT_FOUND_VALUE([]));
    }
  }
}
