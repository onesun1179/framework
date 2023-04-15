import { ArgsType, Field, InputType, Int, PickType } from '@nestjs/graphql';
import { Nullable } from 'src/common/type';
import { FrontComponentEntity } from '@modules/front-component/entity/front-component.entity';

@InputType()
@ArgsType()
export class InsertFrontComponentInput extends PickType(FrontComponentEntity, [
  'id',
]) {
  @Field(() => [String], {
    nullable: true,
  })
  allFrontComponentIds?: Nullable<Array<FrontComponentEntity['id']>>;

  @Field(() => [Int], {
    nullable: true,
  })
  roleSeqNos?: Nullable<Array<number>>;

  @Field(() => [Int], {
    nullable: true,
  })
  routeSeqNos?: Nullable<Array<number>>;
}
