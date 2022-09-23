import { HomeOutlined, MessageOutlined, UsergroupDeleteOutlined, NotificationOutlined, SettingOutlined } from '@ant-design/icons'
import classNames from 'classnames/bind';
import styles from './Menu.model.scss';
import { LoginOutlined, UserOutlined } from '@ant-design/icons';
const cx = classNames.bind(styles)
export const LIST_MENU = [
    {
        name: 'home',
        action: 'HOME',
        icon: <HomeOutlined className={cx('icon')} />,
    },
    {
        name: 'Group',
        action: 'GROUP',
        icon: <UsergroupDeleteOutlined />,
    },
    {
        name: 'message',
        action: 'MESSAGE',
        icon: <MessageOutlined className={cx('icon')} />,
    },
    {
        name: 'notification',
        action: 'NOTIFICATION',
        icon: <NotificationOutlined className={cx('icon')} />,
        active: false,
    },
    {
        name: 'setting',
        children: [
            {
                icon: <LoginOutlined />,
                title: 'log out',
                action: 'LOGOUT',
            }
        ],
        icon: <SettingOutlined className={cx('icon')} />,
    },

]
