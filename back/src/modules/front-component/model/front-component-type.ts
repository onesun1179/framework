import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CommonEntity } from '@common/entity/common.entity';
import { FrontComponent } from './front-component';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { UtilField } from '@util/Util.field';

@Entity()
@InputType({
  isAbstract: true,
})
@ObjectType()
export class FrontComponentType extends CommonEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int, {
    description: UtilField.getFieldComment(
      'front',
      'component',
      'type',
      'seqNo',
    ),
  })
  seqNo: number;

  @Column()
  @Field()
  name: string;

  @OneToMany(() => FrontComponent, (o) => o.frontComponentType)
  frontComponents: FrontComponent[];
}
