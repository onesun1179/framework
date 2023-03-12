import { InputType } from '@nestjs/graphql';
import { Icon } from './model/Icon';

@InputType()
export class InsertIconIn extends Icon {}
