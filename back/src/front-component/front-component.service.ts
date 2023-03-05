import { Injectable } from '@nestjs/common';
import { WhenDbInit } from '../common/types/WhenDbInit';
import { Builder } from 'builder-pattern';
import { FrontComponent } from './model/FrontComponent';
import {
  FRONT_COMPONENT_MAP,
  FRONT_COMPONENT_TYPE_GROUP_MAP,
} from './front-component.constant';
import { ValueOf } from '../common/types';
import { FrontComponentType } from './model/FrontComponentType';

@Injectable()
export class FrontComponentService implements WhenDbInit {
  async whenDbInit() {
    const frontComponentTypes = await Promise.all(
      Object.keys(FRONT_COMPONENT_TYPE_GROUP_MAP).map((o) =>
        (async () => {
          return await Builder(FrontComponentType, {
            name: o,
          })
            .build()
            .save();
        })(),
      ),
    );

    await Promise.all(
      (
        Object.entries(FRONT_COMPONENT_MAP) as Array<
          [
            keyof typeof FRONT_COMPONENT_MAP,
            ValueOf<typeof FRONT_COMPONENT_MAP>,
          ]
        >
      ).map(([k, v]) =>
        (async () => {
          await Builder(FrontComponent, {
            id: k,
            value: v,
            initialValue: v,
            frontComponentType: Object.entries(
              FRONT_COMPONENT_TYPE_GROUP_MAP,
            ).reduce((r, [k, v]) => {
              if (v.some((o) => o === k)) {
                r = frontComponentTypes.find((oo) => oo.name === k);
              }
              return r;
            }, null as FrontComponentType),
          })
            .build()
            .save();
        })(),
      ),
    );
  }
}
