import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Nullable } from '@common/type';
import { Type } from 'class-transformer';
import { CommonEntity } from '@common/entity/common.entity';
import { IconIconGroupMapOutput } from '@modules/icon/dto/output/entity/icon-icon-group-map.output';
import { MenuOutput } from '@modules/menu/dto/output/entity/menu.output';

@Entity('icon')
@InputType({
  isAbstract: true,
})
@ObjectType()
export class IconOutput extends CommonEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  seqNo!: number;

  @Column()
  @Field()
  name!: string;

  @Column()
  @Field()
  filePath!: string;

  @OneToMany(() => IconIconGroupMapOutput, (o) => o.icon, {
    nullable: true,
  })
  @Type(() => IconIconGroupMapOutput)
  iconIconGroupMaps?: Nullable<Array<IconIconGroupMapOutput>>;

  @OneToMany(() => MenuOutput, (o) => o.icon, {
    nullable: true,
  })
  @Type(() => MenuOutput)
  menus?: Nullable<Array<MenuOutput>>;
}
