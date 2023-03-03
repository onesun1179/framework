import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PathEntity } from '../entity/path.entity';

@ObjectType({
  description: '경로',
})
export class Path implements Pick<PathEntity, 'id' | 'path'> {
  @Field(() => Int, {
    description: '경로 id',
  })
  id: number;

  @Field({
    description: '경로 명',
  })
  title: string;

  @Field({
    description: '경로 path',
  })
  path: string;

  @Field({
    description: '컴포넌트 path',
    nullable: true,
  })
  componentPath?: string;

  @Field(() => [Path], {
    description: '자식 경로들',
  })
  children: Path[];
}
