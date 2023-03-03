import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommonEntity } from '../../common/entity/common.entity';
import { PathsByAuthsEntity } from './pathsByAuths.entity';
import { Builder } from 'builder-pattern';
import { Path } from '../model/path.model';

@Entity({
  name: 'path',
})
export class PathEntity extends CommonEntity {
  @PrimaryGeneratedColumn({
    comment: '경로 id',
  })
  id: number;

  @Column({
    comment: '경로 명',
    nullable: true,
  })
  title: string;

  @Column({
    comment: '경로 path',
  })
  path: string;

  @Column({
    comment: '컴포넌트 path',
    nullable: true,
  })
  componentPath?: string;

  @OneToMany(() => PathEntity, (o) => o.id)
  children?: PathEntity[];

  @ManyToOne(() => PathEntity, (o) => o.id)
  @JoinColumn({
    name: 'parent_id',
    referencedColumnName: 'id',
  })
  parent?: PathEntity;

  @OneToMany(() => PathsByAuthsEntity, (o) => o.path)
  pathsByAuthsList?: PathsByAuthsEntity[];

  toPath() {
    return Builder(Path, {
      id: this.id,
      title: this.title,
      path: this.path,
      componentPath: this.componentPath,
      children: (this.children || []).map((o) => o.toPath()),
    }).build();
  }
}
