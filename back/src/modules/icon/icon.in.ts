import { InputType } from '@nestjs/graphql';
import { Icon } from './model/icon';

@InputType()
export class InsertIconIn extends Icon {}
