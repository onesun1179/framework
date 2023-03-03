import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { PathEntity } from './path.entity';
import { AuthEntity } from '../../auth/entity/auth.entity';
import { CommonEntity } from '../../common/entity/common.entity';

@Entity({
  name: 'paths_by_auths',
})
export class PathsByAuthsEntity extends CommonEntity {
  @PrimaryColumn({
    comment: '경로 id',
  })
  pathId: PathEntity['id'];

  @PrimaryColumn({
    comment: '권한 id',
  })
  authId: AuthEntity['id'];

  @ManyToOne(() => PathEntity, (o) => o.pathsByAuthsList)
  @JoinColumn({
    name: 'path_id',
    referencedColumnName: 'id',
  })
  path: PathEntity;

  @ManyToOne(() => AuthEntity, (o) => o.pathsByAuthsList)
  @JoinColumn({
    name: 'auth_id',
    referencedColumnName: 'id',
  })
  auth: AuthEntity;
}
