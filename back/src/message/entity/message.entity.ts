import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommonEntity } from '../../common/entity/common.entity';
import { MessageGroupEntity } from './messageGroup.entity';
import { Builder } from 'builder-pattern';
import { Message } from '../model/message.model';

@Entity({
  name: 'message',
})
export class MessageEntity extends CommonEntity {
  @PrimaryGeneratedColumn({
    comment: '메세지 id',
  })
  id: number;

  @Column({
    type: 'varchar',
    comment: '메세지 내용',
    nullable: false,
  })
  msg: string;

  @Column({
    comment: '메세지그룹 id',
    type: 'varchar',
    length: 5,
  })
  groupId: MessageGroupEntity['id'];

  @ManyToOne(() => MessageGroupEntity, (o) => o.messageList, {})
  @JoinColumn({
    name: 'group_id',
  })
  messageGroup: MessageGroupEntity;

  toMessage() {
    console.log(this);
    return Builder(Message, {
      id: this.groupId + this.id,
      msg: this.msg,
      _id: this.id,
    }).build();
  }
}
