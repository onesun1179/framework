import { CustomRepository } from '@common/decorator/CustomRepository';
import { Repository } from 'typeorm';
import { IconsIconLabelsOutput } from '@modules/icon/dto/output/entity/icons-icon-labels.output';

@CustomRepository(IconsIconLabelsOutput)
export class IconsIconLabelsRepository extends Repository<IconsIconLabelsOutput> {}
