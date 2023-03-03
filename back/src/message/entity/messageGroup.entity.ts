import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { CommonEntity } from '../../common/entity/common.entity';
import { MessageEntity } from './message.entity';

@Entity({
  name: 'message_group',
})
export class MessageGroupEntity extends CommonEntity {
  @PrimaryColumn({
    comment: '메세지그룹 id',
    type: 'varchar',
    length: 5,
  })
  id: string;

  @Column({
    type: 'varchar',
    comment: '메세지그룹 이름',
    nullable: false,
  })
  name: string;

  @OneToMany(() => MessageEntity, (o) => o.messageGroup)
  messageList: MessageEntity[];
}
