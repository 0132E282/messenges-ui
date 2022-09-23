import classNames from "classnames/bind";
import styles from './Menu.model.scss';
import { LIST_MENU } from "./listMenu";
import MenuItem from "./MenuItem";
const cx = classNames.bind(styles);
function Menu() {
    return (<div className={cx('wrapper')}>
        {
            LIST_MENU.map((menu, index) =>
                <MenuItem
                    action={menu.action}
                    key={index}
                    icon={menu.icon}
                    defaultValue={menu}
                />
            )
        }
    </div>);
}

export default Menu;