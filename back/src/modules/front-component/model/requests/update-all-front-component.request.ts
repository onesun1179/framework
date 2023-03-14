import { ArgsType, InputType } from '@nestjs/graphql';
import { InsertAllFrontComponentRequest } from '@modules/front-component/model/requests/insert-all-front-component.request';

@InputType()
@ArgsType()
export class UpdateAllFrontComponentRequest extends InsertAllFrontComponentRequest {}
