import { ArgsType, InputType } from '@nestjs/graphql';
import { InsertAllFrontComponentEntityInput } from '@modules/front-component/dto/input/insert-all-front-component-entity.input';

@InputType()
@ArgsType()
export class UpdateAllFrontComponentEntityInput extends InsertAllFrontComponentEntityInput {}
