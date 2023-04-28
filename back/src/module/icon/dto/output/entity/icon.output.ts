import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Nullable } from '@common/type';
import { Type } from 'class-transformer';
import { CommonEntity } from '@common/entity/common.entity';
import { MenuOutput } from '@modules/menu/dto/output/entity/menu.output';
import { IconsIconLabelsOutput } from '@modules/icon/dto/output/entity/icons-icon-labels.output';

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

  @OneToMany(() => IconsIconLabelsOutput, (o) => o.icon, {
    nullable: true,
  })
  @Type(() => IconsIconLabelsOutput)
  iconsIconLabelsList?: Array<IconsIconLabelsOutput>;

  @OneToMany(() => MenuOutput, (o) => o.icon, {
    nullable: true,
  })
  @Type(() => MenuOutput)
  menus?: Nullable<Array<MenuOutput>>;
}
