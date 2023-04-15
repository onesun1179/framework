import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MenuByAuthOutput } from '@modules/menu/dto/output/menu-by-auth.output';
import { CommonEntity } from '@common/entity/common.entity';
import { MenuRoleMapEntity } from './menu-role-map.entity';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IconEntity } from '@modules/icon/entity/icon.entity';
import { RouteEntity } from '@modules/route/entity/route.entity';
import { Nullable } from '@common/type';
import { Type } from 'class-transformer';
import { Builder } from 'builder-pattern';

console.log({
  MenuByAuthOutput,
});
@Entity('menu')
@InputType({
  isAbstract: true,
})
@ObjectType()
export class MenuEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  seqNo!: number;

  @Column()
  @Field()
  name!: string;

  @Column({
    nullable: true,
  })
  @Field(() => Int, {
    nullable: true,
  })
  iconSeqNo?: Nullable<number>;

  @ManyToOne(() => IconEntity, (o) => o.menus, {
    nullable: true,
  })
  @JoinColumn({
    name: 'icon_seq_no',
  })
  @Type(() => IconEntity)
  icon?: Nullable<IconEntity>;

  @OneToMany(() => MenuRoleMapEntity, (o) => o.menu, {
    nullable: true,
  })
  @Type(() => MenuRoleMapEntity)
  menuRoleMaps?: Array<MenuRoleMapEntity>;

  @Column({
    nullable: true,
  })
  @Field(() => Int, {
    nullable: true,
  })
  routeSeqNo?: Nullable<number>;

  @ManyToOne(() => RouteEntity, (o) => o.menus, {
    nullable: true,
  })
  @JoinColumn({
    name: 'route_seq_no',
  })
  @Type(() => RouteEntity)
  route?: Nullable<RouteEntity>;

  toMenuByAuthOutput(): MenuByAuthOutput | null {
    if (this.menuRoleMaps && this.menuRoleMaps.length > 0) {
      const { orderNo, roleSeqNo } = this.menuRoleMaps[0];

      return Builder(MenuByAuthOutput, {
        ...this,
        orderNo,
        roleSeqNo,
      }).build();
    }

    return null;
  }
}
