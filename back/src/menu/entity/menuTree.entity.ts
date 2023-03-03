import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { CommonEntity } from '../../common/entity/common.entity';
import { MenuEntity } from './menu.entity';

@Entity({
  name: 'menu_tree',
})
export class MenuTreeEntity extends CommonEntity {
  @PrimaryColumn({
    comment: '자식 메뉴 id',
  })
  childId?: MenuEntity['id'];

  @PrimaryColumn({
    comment: '부모 메뉴 id',
  })
  parentId?: MenuEntity['id'];

  @ManyToOne(() => MenuEntity, (o) => o.childList)
  @JoinColumn({
    name: 'child_id',
  })
  child: MenuEntity;

  @ManyToOne(() => MenuEntity, (o) => o.parentList)
  @JoinColumn({
    name: 'parent_id',
  })
  parent: MenuEntity;
}
