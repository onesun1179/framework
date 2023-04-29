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
import { CodeMapOutput } from '@modules/code/dto/output/entity/code-map.output';
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

@Resolver(() => CodeOutput)
@UseGuards(GqlAuthGuard)
export class CodeResolver {
  constructor(
    private codeRepository: CodeRepository,
    private codeMapRepository: CodeMapRepository,
  ) {}

  /**************************************
   *              QUERY
   ***************************************/
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

    codesInput.search && UtilSearch.setSearchByQB(qb, codesInput.search);
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
  @ResolveField(() => [CodeOutput])
  async parents(@Parent() { seqNo }: CodeOutput): Promise<Array<CodeOutput>> {
    return await this.codeRepository
      .createQueryBuilder('cd')
      .innerJoin(
        CodeMapOutput,
        `cdm`,
        `
      cdm.parent_seq_no = cd.seq_no AND
      cdm.child_seq_no = :seqNo 
      `,
        {
          seqNo,
        },
      )

      .getMany();
  }

  @ResolveField(() => [CodeOutput])
  async children(@Parent() { seqNo }: CodeOutput): Promise<Array<CodeOutput>> {
    return await this.codeRepository
      .createQueryBuilder('cd')
      .innerJoin(
        CodeMapOutput,
        `cdm`,
        `
      cdm.child_seq_no = cd.seq_no AND
      cdm.parent_seq_no = :seqNo 
      `,
        {
          seqNo,
        },
      )
      .getMany();
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
    return await this.codeRepository.saveCustom(insertCodeInput);
  }

  @Mutation(() => CodeOutput)
  async updateCode(
    @Args('updateCodeInput', {
      type: () => UpdateCodeInput,
    })
    updateCodeInput: UpdateCodeInput,
  ): Promise<CodeOutput> {
    if (await this.codeRepository.hasRow(updateCodeInput.seqNo)) {
      return await this.codeRepository.saveCustom(updateCodeInput);
    } else {
      throw new GqlError(MessageConstant.NOT_FOUND_VALUE([]));
    }
  }
}
