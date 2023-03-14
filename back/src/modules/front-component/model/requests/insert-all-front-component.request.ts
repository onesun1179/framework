import {
  ArgsType,
  InputType,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { AllFrontComponent } from '@modules/front-component/model/all-front-component';

@InputType()
@ArgsType()
export class InsertAllFrontComponentRequest extends IntersectionType(
  PickType(AllFrontComponent, ['seqNo']),
  PickType(PartialType(AllFrontComponent), ['frontComponentSeqNo']),
) {}
