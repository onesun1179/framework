import { CustomRepository } from '@common/decorator/CustomRepository';
import { Repository } from 'typeorm';
import { MenuEntity } from '@modules/menu/dto/output/entity/menu.entity';
import { InsertMenuInput } from '@modules/menu/dto/input/insert-menu.input';
import { UpdateMenuInput } from '@modules/menu/dto/input/update-menu.input';
import { GqlError } from '@common/error/GqlError';
import { MessageConstant } from '@common/constants/message.constant';

@CustomRepository(MenuEntity)
export class MenuRepository extends Repository<MenuEntity> {
  async hasRow(seqNo: number) {
    return await this.exist({
      where: {
        seqNo,
      },
    });
  }

  async saveCustom(p: InsertMenuInput | UpdateMenuInput): Promise<MenuEntity> {
    return await this.save(
      MenuEntity.create({
        seqNo:
          p instanceof UpdateMenuInput
            ? await (async () => {
                if (await this.hasRow(p.seqNo)) {
                  return p.seqNo;
                } else {
                  throw new GqlError(MessageConstant.NOT_FOUND_VALUE([]));
                }
              })()
            : undefined,
        name: p.name,
        iconSeqNo: p.iconSeqNo,
        routeSeqNo: p.routeSeqNo,
        desc: p.desc,
      }),
    );
  }
}
