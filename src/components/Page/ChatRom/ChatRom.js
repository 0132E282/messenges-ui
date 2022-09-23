import { useContext } from 'react';
import classnames from 'classnames/bind';

import { appProviderData } from '~/context/AppProvider';
import { Img } from '~/assets/img';
import HeaderChatRom from './components/HeaderChatRom';
import Chat from './components/Chat';
import styles from './ChatRom.module.scss';
const cx = classnames.bind(styles)
function ChatRom() {
    const { selectedRom } = useContext(appProviderData);
    return (<div className={cx('wrapper')}>
        {selectedRom ?
            <>
                <div className={cx('header')}>
                    <HeaderChatRom value={selectedRom} />
                </div>
                <div className={cx('container')}>
                    <Chat />
                </div>
            </> : <>
                <div className={cx('message')}>
                    <img className={cx('img')} src={Img.message} alt={'Message'} />
                </div>
            </>
        }
    </div>);
}

export default ChatRom;