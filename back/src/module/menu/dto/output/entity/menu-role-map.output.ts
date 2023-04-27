import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Nullable } from '@common/type';
import { Type } from 'class-transformer';
import { CommonEntity } from '@common/entity/common.entity';
import { RoleOutput } from '@modules/role/dto/output/entity/role.output';
import { MenuOutput } from '@modules/menu/dto/output/entity/menu.output';

@Entity('menu_role_map')
@InputType({
  isAbstract: true,
})
@ObjectType(`MenuRoleMap`)
@Unique('SEQ_NO', ['roleSeqNo', 'menuSeqNo'])
@Unique('ORDER', ['roleSeqNo', 'parentSeqNo', 'orderNo'])
export class MenuRoleMapOutput extends CommonEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  seqNo!: number;

  @Column()
  @Field(() => Int)
  menuSeqNo!: number;

  @Column()
  @Field(() => Int)
  roleSeqNo!: number;

  @Column({
    nullable: true,
  })
  @Field(() => Int, {
    nullable: true,
  })
  parentSeqNo?: Nullable<number>;

  @ManyToOne(() => MenuOutput, (o) => o.menuRoleMaps)
  @JoinColumn({
    name: 'menu_seq_no',
  })
  @Type(() => MenuOutput)
  menu!: MenuOutput;

  @ManyToOne(() => RoleOutput, (o) => o.menuRoleMaps)
  @JoinColumn({
    name: 'role_seq_no',
  })
  @Type(() => RoleOutput)
  role!: RoleOutput;

  @ManyToOne(() => MenuRoleMapOutput, (o) => o.children, {
    nullable: true,
  })
  @JoinColumn({
    name: 'parent_seq_no',
  })
  @Type(() => MenuRoleMapOutput)
  parent?: MenuRoleMapOutput;

  @Field(() => Int)
  @Column({
    type: 'int',
  })
  orderNo!: number;

  @OneToMany(() => MenuRoleMapOutput, (o) => o.parent, {
    nullable: true,
  })
  @Type(() => MenuRoleMapOutput)
  children?: MenuRoleMapOutput[];
}
