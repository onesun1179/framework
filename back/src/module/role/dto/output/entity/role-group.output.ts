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
import { RoleOutput } from '@modules/role/dto/output/entity/role.output';

@Entity('role_group')
@InputType({
  isAbstract: true,
})
@ObjectType()
export class RoleGroupOutput extends CommonEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  seqNo!: number;

  @Column()
  @Field()
  name!: string;

  @OneToMany(() => RoleOutput, (o) => o.roleGroup, {
    nullable: true,
  })
  roles?: Nullable<RoleOutput[]>;

  @OneToMany(() => RoleGroupOutput, (o) => o.parent, {
    nullable: true,
  })
  children?: Nullable<RoleGroupOutput[]>;

  @Column({
    nullable: true,
  })
  @Field(() => Int, {
    nullable: true,
  })
  parentSeqNo?: Nullable<number>;

  @ManyToOne(() => RoleGroupOutput, (o) => o.children, {
    nullable: true,
  })
  @JoinColumn({
    name: 'parent_seq_no',
  })
  parent?: Nullable<RoleGroupOutput>;
}
