import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { CodeEntity } from './code.entity';
import { CommonEntity } from '../../common/entity/common.entity';

@Entity({
  name: 'code_tree',
})
export class CodeTreeEntity extends CommonEntity {
  @PrimaryColumn({
    comment: '자식 코드 id',
  })
  childId?: CodeEntity['id'];

  @PrimaryColumn({
    comment: '부모 코드 id',
  })
  parentId?: CodeEntity['id'];

  @ManyToOne(() => CodeEntity, (o) => o.childList)
  @JoinColumn({
    name: 'child_id',
  })
  child: CodeEntity;

  @ManyToOne(() => CodeEntity, (o) => o.parentList)
  @JoinColumn({
    name: 'parent_id',
  })
  parent: CodeEntity;
}
