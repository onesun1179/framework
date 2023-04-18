import { CustomRepository } from '@common/decorator/CustomRepository';
import { Repository } from 'typeorm';
import { IconEntity } from '@modules/icon/dto/output/entity/icon.entity';

@CustomRepository(IconEntity)
export class IconEntityRepository extends Repository<IconEntity> {}
