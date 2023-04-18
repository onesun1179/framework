import { ArgsType, Field, InputType, Int, PickType } from '@nestjs/graphql';
import { Nullable } from '@common/type';
import { RoleGroupEntity } from '@modules/role/dto/output/entity/role-group.entity';
import { RoleEntity } from '@modules/role/dto/output/entity/role.entity';

@InputType()
@ArgsType()
export class InsertRoleGroupEntityInput extends PickType(RoleGroupEntity, [
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
