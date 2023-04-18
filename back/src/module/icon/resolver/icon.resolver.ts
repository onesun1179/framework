import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import * as process from 'process';
import { IconEntity } from '@modules/icon/dto/output/entity/icon.entity';
import { IconOutput } from '@modules/icon/dto/output/icon.output';
import { IconEntityRepository } from '@modules/icon/repository/icon-entity.repository';

@Resolver(() => IconOutput)
export class IconResolver {
  private readonly logger = new Logger(IconResolver.name);

  constructor(private iconEntityRepository: IconEntityRepository) {}

  @Query(() => IconOutput)
  async icon(@Args('seqNo', { type: () => Int }) seqNo: number) {
    return await this.iconEntityRepository.findOneOrFail({
      where: {
        seqNo,
      },
    });
  }

  /**************************************
   *           RESOLVE_FIELD
   ***************************************/

  @ResolveField(() => String)
  filePath(@Parent() { filePath }: IconEntity): string {
    return process.env.FILE_PATH!.concat(filePath);
  }
}
