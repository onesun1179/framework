import {
  ArgsType,
  InputType,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { CodeOutput } from '@modules/code/dto/output/entity/code.output';
import { InsertCodeInput } from '@modules/code/dto/input/insert-code.input';

@InputType()
@ArgsType()
export class UpdateCodeInput extends IntersectionType(
  PickType(CodeOutput, ['seqNo']),
  PartialType(InsertCodeInput),
) {}
