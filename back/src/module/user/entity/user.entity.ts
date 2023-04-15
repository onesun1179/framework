import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { CommonEntity } from '@common/entity';
import { RoleEntity } from '@modules/role/entity';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@Entity('user')
@InputType({
  isAbstract: true,
})
@ObjectType()
export class UserEntity extends CommonEntity {
  @MaxLength(50)
  @PrimaryColumn({
    type: 'varchar',
    length: 50,
  })
  @Field()
  id!: string;

  @Column()
  @Field(() => Int)
  roleSeqNo!: RoleEntity['seqNo'];

  @ManyToOne(() => RoleEntity, (o) => o.users)
  @JoinColumn({
    name: 'role_seq_no',
  })
  role?: RoleEntity;
}
