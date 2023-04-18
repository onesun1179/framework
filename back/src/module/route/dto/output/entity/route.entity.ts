import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Nullable } from '@common/type';
import { CommonEntity } from '@common/entity/common.entity';
import { FrontComponentEntity } from '@modules/front-component/dto/output/entity/front-component.entity';
import { RoleRouteMapEntity } from '@modules/role/dto/output/entity/role-route-map.entity';
import { MenuEntity } from '@modules/menu/dto/output/entity/menu.entity';
import { RouteOutput } from '@modules/route/dto/output/route.output';
import { Builder } from 'builder-pattern';

@Entity('route')
@InputType({
  isAbstract: true,
})
@ObjectType(`RouteEntityOutput`)
export class RouteEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  seqNo!: number;

  @Column()
  @Field()
  path!: string;

  @Column({
    nullable: true,
  })
  @Field(() => String, {
    nullable: true,
  })
  frontComponentId?: Nullable<string>;

  @ManyToOne(() => FrontComponentEntity, (o) => o.routes, {
    nullable: true,
  })
  @JoinColumn({
    name: 'front_component_id',
  })
  frontComponent?: Nullable<FrontComponentEntity>;

  @OneToMany(() => RouteEntity, (o) => o.parent, {
    nullable: true,
  })
  children?: Nullable<RouteEntity[]>;

  @ManyToOne(() => RouteEntity, (o) => o.children, {
    nullable: true,
  })
  @JoinColumn({
    name: 'parent_seq_no',
  })
  parent?: Nullable<RouteEntity>;

  @Column({
    nullable: true,
  })
  @Field(() => Int, {
    nullable: true,
  })
  parentSeqNo?: Nullable<number>;

  @OneToMany(() => RoleRouteMapEntity, (o) => o.route, {
    nullable: true,
  })
  roleRouteMaps?: Nullable<RoleRouteMapEntity[]>;

  @OneToMany(() => MenuEntity, (o) => o.route, {
    nullable: true,
  })
  menus?: Nullable<Array<MenuEntity>>;

  toRouteOutput(): RouteOutput {
    return Builder(RouteOutput, {
      seqNo: this.seqNo,
      frontComponentId: this.frontComponentId,
      path: this.path,
      parentSeqNo: this.parentSeqNo,
    }).build();
  }
}
