import { ArgsType, Field, InputType, Int, PickType } from '@nestjs/graphql';
import { FrontComponent } from '@modules/front-component/entities/front-component.entity';
import { Nullable } from '@common/types';

@InputType()
@ArgsType()
export class InsertFrontComponentInput extends PickType(FrontComponent, [
  'id',
]) {
  @Field(() => [String], {
    nullable: true,
  })
  allFrontComponentIds?: Nullable<Array<FrontComponent['id']>>;

  @Field(() => [Int], {
    nullable: true,
  })
  roleSeqNos?: Nullable<Array<number>>;

  @Field(() => [Int], {
    nullable: true,
  })
  routeSeqNos?: Nullable<Array<number>>;
}
