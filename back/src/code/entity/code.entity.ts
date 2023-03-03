import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CommonEntity } from '../../common/entity/common.entity';
import { CodeTreeEntity } from './codeTree.entity';

@Entity({
  name: 'code',
})
export class CodeEntity extends CommonEntity {
  @PrimaryGeneratedColumn({
    comment: '코드 id',
  })
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    comment: '코드 명',
  })
  name: string;

  @OneToMany(() => CodeTreeEntity, (o) => o.child)
  childList?: CodeTreeEntity[];

  @OneToMany(() => CodeTreeEntity, (o) => o.parent)
  parentList?: CodeTreeEntity[];
}
