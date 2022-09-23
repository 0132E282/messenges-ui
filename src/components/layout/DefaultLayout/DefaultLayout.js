import classnames from 'classnames/bind'
import styles from './DefaultLayout.module.scss'
import { Row, Col } from 'antd'
import Sidebar from './components/sidebar';
import Modals from "~/components/Modal/Modal";
import { ModalAddVisible } from "~/components/Modal"
const cx = classnames.bind(styles);
function DefaultLayout({ children }) {
    return (<div className={cx('wrapper')}>
        <Row gutter={16} className={cx('row')}>
            <Col span={9} className={cx('sidebar', 'col')}>
                <Sidebar />
            </Col>
            <Col span={15} className={cx('container', 'col')}>
                {children}
            </Col>
        </Row>
        <Modals />
        <ModalAddVisible />
    </div>);
}

export default DefaultLayout;