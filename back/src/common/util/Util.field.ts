import { FieldCommentConstant } from '../constants/field-comment.constant';

export class UtilField {
  static getFieldComment(...fields: Array<keyof typeof FieldCommentConstant>) {
    return fields.map((field) => FieldCommentConstant[field]).join(' ');
  }
}
