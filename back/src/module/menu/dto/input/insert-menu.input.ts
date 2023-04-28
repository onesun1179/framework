import { ArgsType, InputType, PickType } from '@nestjs/graphql';
import { MenuOutput } from '@modules/menu/dto/output/entity/menu.output';

@ArgsType()
@InputType()
export class InsertMenuInput extends PickType(MenuOutput, [
  'name',
  'iconSeqNo',
  'routeSeqNo',
  'desc',
]) {}
