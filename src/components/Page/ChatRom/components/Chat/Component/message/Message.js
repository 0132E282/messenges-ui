import classnames from 'classnames/bind';
import styles from './Message.module.scss';
const cx = classnames.bind(styles);
function Message({ children }) {
    return (<div className={cx('wrapper')} >
        {children}
    </div>);
}

export default Message;