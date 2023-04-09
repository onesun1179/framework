import {
  ArgsType,
  InputType,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { FrontComponent } from '@modules/front-component/entities/front-component.entity';
import { InsertFrontComponentInput } from '@modules/front-component/dto/insert-front-component.input';
import { UtilField } from '@common/utils/util.field';

@InputType({
  description: UtilField.getFieldComment(
    'front',
    'component',
    'update',
    'input',
  ),
})
@ArgsType()
export class UpdateFrontComponentInput extends IntersectionType(
  PickType(FrontComponent, ['id']),
  PartialType(
    PickType(InsertFrontComponentInput, ['roleSeqNos', 'routeSeqNos']),
  ),
) {}
