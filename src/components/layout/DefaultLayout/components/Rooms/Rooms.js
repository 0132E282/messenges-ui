import { SearchOutlined } from "@ant-design/icons"
import classnames from 'classnames/bind'
import { useContext } from "react";
import { UsergroupAddOutlined } from '@ant-design/icons';

import styles from './RoomList.module.scss';
import { appProviderData } from "~/context/AppProvider";
const cx = classnames.bind(styles);
function Rooms({ children, title, icon, inputSearch }) {
    const { setIsModal } = useContext(appProviderData)
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('header-top')}>
                    <h1 className={cx('title')}>
                        <div className={cx('icon-title')} >
                            {icon}
                        </div>
                        {title}
                    </h1>
                    <button className={cx('btn')} onClick={() => {
                        setIsModal(true)
                    }}><UsergroupAddOutlined /></button>
                </div>
                {!inputSearch || <div className={cx('active')}>
                    <input className={cx('search')} placeholder={"search enter"} />
                    <button className={cx('btn')}>
                        <SearchOutlined />
                    </button>
                </div>

                }
            </div>
            <div className={cx('container')}>
                {children}
            </div>
        </div>
    )
}
export default Rooms;