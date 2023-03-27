import { Menu } from '@modules/menu/model/menu';
import { MenuRoleMap } from '@modules/menu/model/menu-role-map';

class MenuItem extends Menu {
  orderNo: MenuRoleMap['orderNo'];
  children: Array<MenuItem>;
}
