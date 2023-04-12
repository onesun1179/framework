import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { CommonEntity } from '@common/entity/common.entity';
import { Role } from '@modules/role/entities/role.entity';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@Entity()
@InputType({
  isAbstract: true,
})
@ObjectType('GqlUser')
export class User extends CommonEntity {
  @MaxLength(50)
  @PrimaryColumn({
    type: 'varchar',
    length: 50,
  })
  @Field()
  id!: string;

  @Column()
  @Field(() => Int)
  roleSeqNo!: Role['seqNo'];

  @ManyToOne(() => Role, (o) => o.users)
  @JoinColumn({
    name: 'role_seq_no',
  })
  role?: Role;
}
