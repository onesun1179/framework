import { ArgsType, InputType } from '@nestjs/graphql';
import { InsertFrontComponentInput } from '@modules/front-component/dto/input/insert-front-component.input';

@InputType()
@ArgsType()
export class UpdateFrontComponentInput extends InsertFrontComponentInput {}
