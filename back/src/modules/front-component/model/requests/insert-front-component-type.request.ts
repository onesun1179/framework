import { ArgsType, Field, InputType, PickType } from '@nestjs/graphql';
import { FrontComponentType } from '@modules/front-component/model/front-component-type';

@InputType()
@ArgsType()
export class InsertFrontComponentTypeRequest extends PickType(
  FrontComponentType,
  ['name'],
) {
  @Field(() => [String], {
    nullable: true,
    defaultValue: null,
  })
  frontComponentIds?: Array<string>;
}
