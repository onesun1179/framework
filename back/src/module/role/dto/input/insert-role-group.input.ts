import { ArgsType, Field, InputType, Int, PickType } from '@nestjs/graphql';
import { Nullable } from '@common/type';
import { RoleGroupOutput } from '@modules/role/dto/output/entity/role-group.output';
import { RoleOutput } from '@modules/role/dto/output/entity/role.output';

@InputType()
@ArgsType()
export class InsertRoleGroupInput extends PickType(RoleGroupOutput, [
  'name',
  'parentSeqNo',
]) {
  @Field(() => [Int], {
    nullable: true,
  })
  roleSeqNos?: Nullable<Array<RoleOutput['seqNo']>>;

  @Field(() => [Int], {
    nullable: true,
  })
  childSeqNos?: Nullable<Array<RoleGroupOutput['seqNo']>>;
}
