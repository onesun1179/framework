import { ArgsType, InputType } from '@nestjs/graphql';
import { InsertAllFrontComponentInput } from '@modules/front-component/dto';

@InputType()
@ArgsType()
export class UpdateAllFrontComponentInput extends InsertAllFrontComponentInput {}
