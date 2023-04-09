import { ArgsType, InputType } from '@nestjs/graphql';
import { InsertAllFrontComponentInput } from '@modules/front-component/dto/insert-all-front-component.input';
import { UtilField } from '@common/utils/util.field';

@InputType({
  description: UtilField.getFieldComment(
    'all',
    'front',
    'component',
    'update',
    'input',
  ),
})
@ArgsType()
export class UpdateAllFrontComponentInput extends InsertAllFrontComponentInput {}
