import { ArgsType, Field, InputType, Int, PickType } from '@nestjs/graphql';
import { FrontComponent } from '@modules/front-component/entities/front-component.entity';
import { UtilField } from '@common/utils/util.field';

@InputType({
  description: UtilField.getFieldComment(
    'front',
    'component',
    'insert',
    'input',
  ),
})
@ArgsType()
export class InsertFrontComponentInput extends PickType(FrontComponent, [
  'id',
]) {
  @Field(() => [Int], {
    nullable: true,
    description: UtilField.getFieldComment(
      'all',
      'front',
      'component',
      'seqNo',
      's',
    ),
  })
  allFrontComponentIds?: Array<string>;

  @Field(() => [Int], {
    nullable: true,
    description: UtilField.getFieldComment('role', 'seqNo', 's'),
  })
  roleSeqNos?: Array<number>;

  @Field(() => [Int], {
    nullable: true,
    description: UtilField.getFieldComment('route', 'seqNo', 's'),
  })
  routeSeqNos?: Array<number>;
}
