import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { CommonEntity } from '../../common/entity/common.entity';
import { AuthEntity } from './auth.entity';

@Entity({
  name: 'auth_tree',
})
export class AuthTreeEntity extends CommonEntity {
  @PrimaryColumn({
    comment: '자식 권한 id',
  })
  childId?: AuthEntity['id'];

  @PrimaryColumn({
    comment: '부모 권한 id',
  })
  parentId?: AuthEntity['id'];

  @ManyToOne(() => AuthEntity, (o) => o.childList)
  @JoinColumn({
    name: 'child_id',
  })
  child: AuthEntity;

  @ManyToOne(() => AuthEntity, (o) => o.parentList)
  @JoinColumn({
    name: 'parent_id',
  })
  parent: AuthEntity;
}
