import { Injectable } from '@nestjs/common';
import { InsertCodeInput } from '@modules/code/dto/input/insert-code.input';
import { UpdateCodeInput } from '@modules/code/dto/input/update-code.input';
import { CodeOutput } from '@modules/code/dto/output/entity/code.output';
import { CodeMapOutput } from '@modules/code/dto/output/entity/code-map.output';
import { difference } from 'lodash';
import { CodeRepository } from '@modules/code/repository/code.repository';
import { CodeMapRepository } from '@modules/code/repository/code-map.repository';

@Injectable()
export class CodeService {
  constructor(
    private codeRepository: CodeRepository,
    private codeMapRepository: CodeMapRepository,
  ) {}
  async saveCodeCustom(
    p: InsertCodeInput | UpdateCodeInput,
  ): Promise<CodeOutput> {
    const code = await this.codeRepository.save(
      CodeOutput.create({
        seqNo: p instanceof UpdateCodeInput ? p.seqNo : undefined,
        name: p.name,
        desc: p.desc,
      }),
    );
    if (p.parentCodeSeqNos) {
      const parentSeqNos = await this.codeRepository
        .createQueryBuilder(`cd`)
        .innerJoin(
          CodeMapOutput,
          `parent`,
          `parent.parent_seq_no = cd.seq_no AND
        parent.child_seq_no = :childSeqNo
        `,
          {
            childSeqNo: code.seqNo,
          },
        )
        .getMany()
        .then((r) => r.map((o) => o.seqNo));

      const willDeleteSeqNo = difference(parentSeqNos, p.parentCodeSeqNos);
      const willInsertSeqNo = difference(p.parentCodeSeqNos, parentSeqNos);

      if (willDeleteSeqNo.length > 0) {
        await this.codeMapRepository.remove(
          willDeleteSeqNo.map((parentSeqNo) => {
            return CodeMapOutput.create({
              parentSeqNo,
              childSeqNo: code.seqNo,
            });
          }),
        );
      }

      if (willInsertSeqNo.length > 0) {
        await this.codeMapRepository.insert(
          willInsertSeqNo.map((parentSeqNo) => {
            return CodeMapOutput.create({
              parentSeqNo,
              childSeqNo: code.seqNo,
            });
          }),
        );
      }
    }

    if (p.childCodeSeqNos) {
      const childSeqNos = await this.codeRepository
        .createQueryBuilder(`cd`)
        .innerJoin(
          CodeMapOutput,
          `child`,
          `child.child_seq_no = cd.seq_no AND
        child.parent_seq_no = :parentSeqNo
        `,
          {
            parentSeqNo: code.seqNo,
          },
        )
        .getMany()
        .then((r) => r.map((o) => o.seqNo));
      const willDeleteSeqNo = difference(childSeqNos, p.childCodeSeqNos);
      const willInsertSeqNo = difference(p.childCodeSeqNos, childSeqNos);

      if (willDeleteSeqNo.length > 0) {
        await this.codeMapRepository.remove(
          willDeleteSeqNo.map((childSeqNo) => {
            return CodeMapOutput.create({
              parentSeqNo: code.seqNo,
              childSeqNo,
            });
          }),
        );
      }

      if (willInsertSeqNo.length > 0) {
        await this.codeMapRepository.insert(
          willInsertSeqNo.map((childSeqNo) => {
            return CodeMapOutput.create({
              parentSeqNo: code.seqNo,
              childSeqNo,
            });
          }),
        );
      }
    }

    return code;
  }
}
