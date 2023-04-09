import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { UtilField } from '@common/utils/util.field';

@InputType({
  description: UtilField.getFieldComment('message', 'group', 's', 'input'),
})
@ArgsType()
export class MessageGroupsInput {
  @Field(() => String, {
    description: UtilField.getFieldComment('code'),
    nullable: true,
  })
  code?: string;
  @Field(() => [String], {
    nullable: true,
    description: UtilField.getFieldComment('code', 's'),
  })
  codes?: Array<string>;

  @Field(() => String, {
    nullable: true,
    description: UtilField.getFieldComment('name'),
  })
  name?: string;
}
