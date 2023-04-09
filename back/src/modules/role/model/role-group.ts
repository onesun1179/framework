import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommonEntity } from '@common/entity/common.entity';
import { Role } from './role';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@Entity()
@InputType({
  isAbstract: true,
})
@ObjectType('GqlRoleGroup')
export class RoleGroup extends CommonEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  seqNo!: number;

  @Column({
    nullable: false,
  })
  @Field({
    nullable: false,
  })
  name?: string;

  @OneToMany(() => Role, (o) => o.roleGroup, {
    nullable: true,
  })
  roles?: Role[];

  @OneToMany(() => RoleGroup, (o) => o.parent, {
    nullable: true,
  })
  children?: RoleGroup[];

  @Column()
  @Field(() => Int, {
    nullable: true,
  })
  parentSeqNo?: number;

  @ManyToOne(() => RoleGroup, (o) => o.children, {
    nullable: true,
  })
  @JoinColumn({
    name: 'parent_seq_no',
  })
  parent?: RoleGroup;
}
