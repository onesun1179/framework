import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CommonEntity } from '@common/entity/common.entity';
import { MenuEntity } from '@modules/menu/entity/menu.entity';
import { IconIconGroupMapEntity } from '../../icon/entity/icon-icon-group-map.entity';
import { Nullable } from 'src/common/type';
import { Type } from 'class-transformer';

@Entity('icon')
@InputType({
  isAbstract: true,
})
@ObjectType()
export class IconEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  seqNo!: number;

  @Column()
  @Field()
  name!: string;

  @Column()
  @Field()
  filePath!: string;

  @OneToMany(() => IconIconGroupMapEntity, (o) => o.icon, {
    nullable: true,
  })
  @Type(() => IconIconGroupMapEntity)
  iconIconGroupMaps?: Nullable<Array<IconIconGroupMapEntity>>;

  @OneToMany(() => MenuEntity, (o) => o.icon, {
    nullable: true,
  })
  @Type(() => MenuEntity)
  menus?: Nullable<Array<MenuEntity>>;
}
