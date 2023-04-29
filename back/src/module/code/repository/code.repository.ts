import { CustomRepository } from '@common/decorator/CustomRepository';
import { Repository } from 'typeorm';
import { CodeOutput } from '@modules/code/dto/output/entity/code.output';
import { InsertCodeInput } from '@modules/code/dto/input/insert-code.input';
import { UpdateCodeInput } from '@modules/code/dto/input/update-code.input';

@CustomRepository(CodeOutput)
export class CodeRepository extends Repository<CodeOutput> {
  async hasRow(seqNo: number) {
    return await this.exist({
      where: {
        seqNo,
      },
    });
  }
  async saveCustom(p: InsertCodeInput | UpdateCodeInput): Promise<CodeOutput> {
    return this.save(
      CodeOutput.create({
        seqNo: p instanceof UpdateCodeInput ? p.seqNo : undefined,
        name: p.name,
        desc: p.desc,
      }),
    );
  }
}
