import { ArgsType, InputType } from '@nestjs/graphql';
import { InsertAllFrontComponentInput } from '@modules/front-component/dto/insert-all-front-component.input';

@InputType()
@ArgsType()
export class UpdateAllFrontComponentInput extends InsertAllFrontComponentInput {}
