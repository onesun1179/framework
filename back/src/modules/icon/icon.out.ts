import { OmitType } from '@nestjs/graphql';
import { Icon } from './model/icon';

export class InsertIcon extends OmitType(Icon, [
  'id',
  'iconGroupSeqNo',
  'updatedAt',
  'createdAt',
]) {}
