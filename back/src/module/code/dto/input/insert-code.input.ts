import { ArgsType, InputType, PickType } from '@nestjs/graphql';
import { CodeOutput } from '@modules/code/dto/output/entity/code.output';

@ArgsType()
@InputType()
export class InsertCodeInput extends PickType(CodeOutput, ['name', 'desc']) {}
