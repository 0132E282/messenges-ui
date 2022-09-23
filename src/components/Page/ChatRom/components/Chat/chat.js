import { Button, Input } from 'antd';
import classnames from 'classnames/bind';
import { useContext, useMemo, useState, useRef, useEffect } from 'react';
import { Timestamp } from 'firebase/firestore';

import { AddDocument } from '~/Firebase/service';
import styles from './chat.module.scss';
import Message, { MessagesItem } from './Component/message';
import { appProviderData } from '~/context/AppProvider';
import { useFireStore } from '~/hook/useFireStore';
const cx = classnames.bind(styles);
function Chat() {
    const { user, selectedRom } = useContext(appProviderData);
    const [valueMessage, setValueMessage] = useState('');
    const inputValueMessage = useRef()

    const handleChange = (e) => {
        if (selectedRom.members.length < 2)
            if (e.target.value === ' ' || e.target.value.length < 1) {
                setValueMessage('')
            } else {
                setValueMessage(e.target.value)
            }
    }

    const handleSendValue = () => {
        if (valueMessage.length > 1) {
            AddDocument('message', {
                text: valueMessage,
                uid: user.uid,
                displayName: user.displayName,
                photoUrl: user.photoURL,
                romId: selectedRom.id,
                dateMessage: Timestamp.fromDate(new Date())
            })
            setValueMessage('')
        };
    }
    const conditions = useMemo(() => {
        return {
            fieldNames: 'romId',
            operator: '==',
            compareValues: selectedRom.id
        }
    }, [selectedRom.id]);
    const dateMessage = useFireStore('message', conditions);

    return (<div className={cx('wrapper')}>
        <Message>
            {dateMessage[0] ? dateMessage.map((data, index) => {
                return <MessagesItem
                    key={index}
                    displayName={data.displayName}
                    text={data.text}
                    avatar={data.photoUrl}
                    date={data.dateMessage}

                />
            }
            ) : <>
                <h1>
                    hay la nguoi nhan tin dau tien
                </h1>
            </>}
        </Message>
        <div className={cx('input-text')}>
            <Input
                ref={inputValueMessage}
                className={cx('chat')}
                type={'text'}
                onChange={handleChange}
                value={valueMessage}
                placeholder={'Message'}

            />
            <Button className={cx('button')} onClick={handleSendValue}>send</Button>
        </div>
    </div>);
}

export default Chat;