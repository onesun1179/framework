import { ArgsType, InputType } from '@nestjs/graphql';
import { InsertFrontComponentEntityInput } from '@modules/front-component/dto/input/insert-front-component-entity.input';

@InputType()
@ArgsType()
export class UpdateFrontComponentEntityInput extends InsertFrontComponentEntityInput {}
