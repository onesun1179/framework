import {
  ArgsType,
  InputType,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { AllFrontComponent } from '@modules/front-component/entities/all-front-component.entity';
import { UtilField } from '@common/utils/util.field';

@InputType({
  description: UtilField.getFieldComment(
    'all',
    'front',
    'component',
    'insert',
    'input',
  ),
})
@ArgsType()
export class InsertAllFrontComponentInput extends IntersectionType(
  PickType(AllFrontComponent, ['id']),
  PickType(PartialType(AllFrontComponent), ['frontComponentId']),
) {}
