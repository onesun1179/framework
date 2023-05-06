import { ArgsType, InputType, PickType } from '@nestjs/graphql';
import { MenuEntity } from '@modules/menu/dto/output/entity/menu.entity';

@ArgsType()
@InputType()
export class InsertMenuInput extends PickType(MenuEntity, [
  'name',
  'iconSeqNo',
  'routeSeqNo',
  'desc',
]) {}
