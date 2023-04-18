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
import { RoleEntity } from '@modules/role/dto/output/entity/role.entity';

@Entity('role_group')
@InputType({
  isAbstract: true,
})
@ObjectType(`RoleGroupEntityOutput`)
export class RoleGroupEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  seqNo!: number;

  @Column()
  @Field()
  name!: string;

  @OneToMany(() => RoleEntity, (o) => o.roleGroup, {
    nullable: true,
  })
  roles?: Nullable<RoleEntity[]>;

  @OneToMany(() => RoleGroupEntity, (o) => o.parent, {
    nullable: true,
  })
  children?: Nullable<RoleGroupEntity[]>;

  @Column()
  @Field(() => Int, {
    nullable: true,
  })
  parentSeqNo?: Nullable<number>;

  @ManyToOne(() => RoleGroupEntity, (o) => o.children, {
    nullable: true,
  })
  @JoinColumn({
    name: 'parent_seq_no',
  })
  parent?: Nullable<RoleGroupEntity>;
}
