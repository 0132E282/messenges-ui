import { Row, Col, Avatar } from 'antd'
import classnames from 'classnames/bind'
import Wrapper, { Menu } from '~/components/popoer';
import styles from './Sidebar.module.scss'
import { useContext } from 'react';
import { appProviderData } from '~/context/AppProvider';
import { Img } from '~/assets/img';
import BoxChat from "~/components/boxChat/BoxChat";

const cx = classnames.bind(styles);
function Sidebar() {
    const { user, ActiveMenu, SetSelectedRomId } = useContext(appProviderData);
    return (
        <Row className={cx('wrapper')}>
            <Col span={6} className={cx('feature')}>
                <Avatar className={cx('avatar')} src={user.photoURL ?? Img.defaults} />
                <Wrapper>
                    <Menu />
                </Wrapper>
            </Col>
            <Col span={17} className={cx('container')}>
                {ActiveMenu.map((item, index) => {
                    let Layout = item.layout
                    let data = item.data
                    return <Layout key={index} title={item.title} icon={item.icon} inputSearch={item.showHeader}>
                        {data.map((rom, index) => {
                            return <BoxChat key={index} values={rom} onClick={() => {
                                SetSelectedRomId(rom.id);
                            }} />
                        })}
                    </Layout>
                })}
            </Col>
        </Row>
    );
}

export default Sidebar;