import { ArgsType, InputType } from '@nestjs/graphql';
import { InsertAllFrontComponentInput } from '@modules/front-component/dto/input';

@InputType()
@ArgsType()
export class UpdateAllFrontComponentInput extends InsertAllFrontComponentInput {}
