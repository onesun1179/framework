import { ArgsType, Field, InputType, Int, PickType } from '@nestjs/graphql';
import { CodeOutput } from '@modules/code/dto/output/entity/code.output';
import { Nullable } from '@common/type';

@ArgsType()
@InputType()
export class InsertCodeInput extends PickType(CodeOutput, ['name', 'desc']) {
  @Field(() => [Int], {
    name: 'parentCodeSeqNos',
    nullable: true,
  })
  parentCodeSeqNos?: Nullable<Array<number>>;

  @Field(() => [Int], {
    name: 'childCodeSeqNos',
    nullable: true,
  })
  childCodeSeqNos?: Nullable<Array<number>>;
}
