import { Avatar, Typography } from 'antd';
import classnames from 'classnames/bind';
import styles from './Message.module.scss';
const cx = classnames.bind(styles);
function Message({ avatar, displayName, text }) {
    return (<div className={cx('Message-item')} >
        <Avatar className={cx('avatar')} src={avatar} />
        <div className={cx('container')}>
            <div className={cx('info')}>
                <div className={cx('info-nickname')}>{displayName}</div>
                <div className={cx('info-date')}>20:2</div>
            </div>
            <Typography.Text className={cx('text')}> {text}</Typography.Text>
        </div>
    </div>);
}

export default Message;