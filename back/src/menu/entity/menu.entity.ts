import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CommonEntity } from '../../common/entity/common.entity';
import { MenuTreeEntity } from './menuTree.entity';
import { MenusByAuthsEntity } from './menusByAuths.entity';

@Entity({
  name: 'menu',
})
export class MenuEntity extends CommonEntity {
  @PrimaryGeneratedColumn({
    comment: '메뉴 id',
  })
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    comment: '메뉴 명',
  })
  name: string;

  @OneToMany(() => MenuTreeEntity, (o) => o.child)
  childList?: MenuTreeEntity[];

  @OneToMany(() => MenuTreeEntity, (o) => o.parent)
  parentList?: MenuTreeEntity[];

  @OneToMany(() => MenusByAuthsEntity, (o) => o.menu)
  menusByAuthsList?: MenusByAuthsEntity[];
}
