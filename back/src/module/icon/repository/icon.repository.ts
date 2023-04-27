import { CustomRepository } from '@common/decorator/CustomRepository';
import { Repository } from 'typeorm';
import { IconOutput } from '@modules/icon/dto/output/entity/icon.output';

@CustomRepository(IconOutput)
export class IconRepository extends Repository<IconOutput> {}
