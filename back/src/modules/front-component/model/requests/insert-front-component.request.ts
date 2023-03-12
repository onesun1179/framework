import { ArgsType, Field, InputType, Int, PickType } from '@nestjs/graphql';
import { FrontComponent } from '@modules/front-component/model/front-component';

@InputType()
@ArgsType()
export class InsertFrontComponentRequest extends PickType(FrontComponent, [
  'id',
  'frontComponentTypeSeqNo',
  'initialFrontComponentId',
]) {
  @Field(() => [Int], {
    nullable: true,
  })
  roleSeqNos: Array<number>;

  @Field(() => [Int], {
    nullable: true,
  })
  routeSeqNos: Array<number>;
}
