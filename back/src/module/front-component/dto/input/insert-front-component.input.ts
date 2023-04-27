import { ArgsType, Field, InputType, Int, PickType } from '@nestjs/graphql';
import { Nullable } from 'src/common/type';
import { FrontComponentOutput } from '@modules/front-component/dto/output/entity/front-component.output';

@InputType()
@ArgsType()
export class InsertFrontComponentInput extends PickType(FrontComponentOutput, [
  'id',
  'name',
  'desc',
]) {
  @Field(() => [String], {
    nullable: true,
  })
  allFrontComponentIds?: Nullable<Array<FrontComponentOutput['id']>>;

  @Field(() => [Int], {
    nullable: true,
  })
  roleSeqNos?: Nullable<Array<number>>;

  @Field(() => [Int], {
    nullable: true,
  })
  routeSeqNos?: Nullable<Array<number>>;
}
