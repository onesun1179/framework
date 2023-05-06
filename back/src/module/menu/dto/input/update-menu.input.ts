import {
  ArgsType,
  InputType,
  IntersectionType,
  PickType,
} from '@nestjs/graphql';
import { MenuEntity } from '@modules/menu/dto/output/entity/menu.entity';
import { InsertMenuInput } from '@modules/menu/dto/input/insert-menu.input';

@ArgsType()
@InputType()
export class UpdateMenuInput extends IntersectionType(
  PickType(MenuEntity, ['seqNo']),
  InsertMenuInput,
) {}
