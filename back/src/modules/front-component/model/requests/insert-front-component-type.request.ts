import { ArgsType, Field, InputType, PickType } from '@nestjs/graphql';
import { UtilField } from '@util/Util.field';
import { FrontComponentType } from '@modules/front-component/model/front-component-type';

@InputType({
  description: UtilField.getFieldComment(
    'front',
    'component',
    'type',
    'insert',
    'req',
  ),
})
@ArgsType()
export class InsertFrontComponentTypeRequest extends PickType(
  FrontComponentType,
  ['name'],
) {
  @Field(() => [String], {
    description: UtilField.getFieldComment('front', 'component', 'id', 's'),
    nullable: true,
    defaultValue: null,
  })
  frontComponentIds?: Array<string>;
}
