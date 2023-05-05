import { CustomRepository } from '@common/decorator/CustomRepository';
import { Repository } from 'typeorm';
import { MenuOutput } from '@modules/menu/dto/output/entity/menu.output';
import { InsertMenuInput } from '@modules/menu/dto/input/insert-menu.input';
import { UpdateMenuInput } from '@modules/menu/dto/input/update-menu.input';
import { GqlError } from '@common/error/GqlError';
import { MessageConstant } from '@common/constants/message.constant';

@CustomRepository(MenuOutput)
export class MenuRepository extends Repository<MenuOutput> {
  async hasRow(seqNo: number) {
    return await this.exist({
      where: {
        seqNo,
      },
    });
  }

  async saveCustom(p: InsertMenuInput | UpdateMenuInput): Promise<MenuOutput> {
    return await this.save(
      MenuOutput.create({
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
