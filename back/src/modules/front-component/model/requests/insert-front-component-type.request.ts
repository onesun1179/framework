import { ArgsType, Field, InputType, Int, PickType } from '@nestjs/graphql';
import { FrontComponentType } from '@modules/front-component/model/front-component-type';

@InputType()
@ArgsType()
export class InsertFrontComponentTypeRequest extends PickType(
  FrontComponentType,
  ['name'],
) {
  @Field(() => [Int], {
    nullable: true,
    defaultValue: null,
  })
  frontComponentSeqNos?: Array<number>;
}
