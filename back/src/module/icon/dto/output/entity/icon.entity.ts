import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Nullable } from '@common/type';
import { Type } from 'class-transformer';
import { CommonEntity } from '@common/entity/common.entity';
import { IconIconGroupMapEntity } from '@modules/icon/dto/output/entity/icon-icon-group-map.entity';
import { MenuEntity } from '@modules/menu/dto/output/entity/menu.entity';
import { IconOutput } from '@modules/icon/dto/output/icon.output';
import { Builder } from 'builder-pattern';

@Entity('icon')
@InputType({
  isAbstract: true,
})
@ObjectType(`IconEntityOutput`)
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

  toIconOutput(): IconOutput {
    return Builder(IconOutput)
      .name(this.name)
      .seqNo(this.seqNo)
      .filePath(this.filePath)
      .build();
  }
}
