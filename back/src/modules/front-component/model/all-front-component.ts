import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommonEntity } from '@common/entity/common.entity';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { UtilField } from '@util/Util.field';
import { FrontComponent } from '@modules/front-component/model/front-component';

@Entity()
@InputType({
  isAbstract: true,
  description: UtilField.getFieldComment('all', 'front', 'component'),
})
@ObjectType({
  description: UtilField.getFieldComment('all', 'front', 'component'),
})
export class AllFrontComponent extends CommonEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  seqNo: number;

  @Column({
    unique: true,
  })
  @Field(() => String)
  name: string;

  @Column({
    nullable: true,
  })
  @Field(() => Int, {
    nullable: true,
  })
  frontComponentSeqNo?: number = null;

  @ManyToOne(() => FrontComponent, (o) => o.allFrontComponents, {
    nullable: true,
  })
  @JoinColumn({
    name: 'front_component_seq_no',
  })
  frontComponent?: FrontComponent = null;
}
