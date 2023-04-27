import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { CommonEntity } from '@common/entity/common.entity';
import { RoleOutput } from '@modules/role/dto/output/entity/role.output';

@Entity('user')
@InputType({
  isAbstract: true,
})
@ObjectType()
export class UserOutput extends CommonEntity {
  @MaxLength(50)
  @PrimaryColumn({
    type: 'varchar',
    length: 50,
  })
  @Field()
  id!: string;

  @Column()
  @Field(() => Int)
  roleSeqNo!: number;

  @ManyToOne(() => RoleOutput, (o) => o.users)
  @JoinColumn({
    name: 'role_seq_no',
  })
  role?: RoleOutput;
}
