import {
  ArgsType,
  InputType,
  IntersectionType,
  PickType,
} from '@nestjs/graphql';
import { MenuOutput } from '@modules/menu/dto/output/entity/menu.output';
import { InsertMenuInput } from '@modules/menu/dto/input/insert-menu.input';

@ArgsType()
@InputType()
export class UpdateMenuInput extends IntersectionType(
  PickType(MenuOutput, ['seqNo']),
  InsertMenuInput,
) {}
