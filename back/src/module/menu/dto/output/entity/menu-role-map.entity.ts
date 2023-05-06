import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import {
  BeforeInsert,
  BeforeUpdate,
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
import { MenuEntity } from '@modules/menu/dto/output/entity/menu.entity';

@Entity('menu_role_map')
@InputType({
  isAbstract: true,
})
@ObjectType('MenuRoleMapOutput')
@Unique('SEQ_NO', ['roleSeqNo', 'menuSeqNo'])
// @Unique('ORDER', ['roleSeqNo', 'parentSeqNo', 'orderNo'])
export class MenuRoleMapEntity extends CommonEntity {
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

  @ManyToOne(() => MenuEntity, (o) => o.menuRoleMaps)
  @JoinColumn({
    name: 'menu_seq_no',
  })
  @Type(() => MenuEntity)
  menu!: MenuEntity;

  @ManyToOne(() => RoleOutput, (o) => o.menuRoleMaps)
  @JoinColumn({
    name: 'role_seq_no',
  })
  @Type(() => RoleOutput)
  role!: RoleOutput;

  @ManyToOne(() => MenuRoleMapEntity, (o) => o.children, {
    nullable: true,
  })
  @JoinColumn({
    name: 'parent_seq_no',
  })
  @Type(() => MenuRoleMapEntity)
  parent?: MenuRoleMapEntity;

  @Field(() => Int)
  @Column({
    type: 'int',
  })
  orderNo!: number;

  @OneToMany(() => MenuRoleMapEntity, (o) => o.parent, {
    nullable: true,
  })
  @Type(() => MenuRoleMapEntity)
  children?: MenuRoleMapEntity[];

  @BeforeInsert()
  async beforeInsert() {
    console.log('beforeInsert');
    // await this.menuService.sortMenu(this);
  }
  @BeforeUpdate()
  async beforeUpdate() {
    console.log('beforeUpdate');
    // await this.menuService.sortMenu(this);
  }
}
