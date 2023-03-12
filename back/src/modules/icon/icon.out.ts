import { OmitType } from '@nestjs/graphql';
import { Icon } from './model/Icon';

export class InsertIcon extends OmitType(Icon, [
  'id',
  'iconGroupSeqNo',
  'updatedAt',
  'createdAt',
]) {}
