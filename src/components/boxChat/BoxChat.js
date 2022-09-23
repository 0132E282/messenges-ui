import classNames from 'classnames/bind';
import styles from './BoxChat.module.scss';
import { Avatar } from 'antd';
import { useContext } from 'react';
import { appProviderData } from '~/context/AppProvider';
const cx = classNames.bind(styles)
function BoxChat({ values, onClick }) {
    const { selectedRomId } = useContext(appProviderData);
    return (<div className={cx('wrapper', selectedRomId === values.id ? 'active' : ' ')}

        onClick={onClick}>
        <Avatar scr={values.avatar} className={cx('avatar')} />
        <div className={cx('container')}>
            <h3 className={cx('names')}>{values.names}</h3>
            <h4 className={cx('description')}>{values.description}</h4>
        </div>
    </div>);
}

export default BoxChat;