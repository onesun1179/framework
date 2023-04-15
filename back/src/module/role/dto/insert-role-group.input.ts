import { ArgsType, Field, InputType, Int, PickType } from '@nestjs/graphql';
import { RoleEntity, RoleGroupEntity } from '@modules/role/entity';
import { Nullable } from 'src/common/type';

@InputType()
@ArgsType()
export class InsertRoleGroupInput extends PickType(RoleGroupEntity, [
  'name',
  'parentSeqNo',
]) {
  @Field(() => [Int], {
    nullable: true,
  })
  roleSeqNos?: Nullable<Array<RoleEntity['seqNo']>>;

  @Field(() => [Int], {
    nullable: true,
  })
  childSeqNos?: Nullable<Array<RoleGroupEntity['seqNo']>>;
}
