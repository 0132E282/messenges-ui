import { Avatar, Button, Tooltip } from "antd";
import { UserAddOutlined } from '@ant-design/icons'
import classnames from "classnames/bind";
import { memo, useContext } from "react";
import { appProviderData } from "~/context/AppProvider";

import styles from './HeaderChatRom.module.scss';
const cx = classnames.bind(styles);
function HeaderChatRom({ value }) {
    const { membersList, setInviteMemberVisible } = useContext(appProviderData)
    return (<div className={cx('wrapper')}>
        <div className={cx('name-rom')}>
            <h3 className={cx('name')}>{value.names}</h3>
            <span className={cx('title')} >{value.description}</span>
        </div>
        <div className={cx('user')}>
            <Button className={cx('button')} icon={<UserAddOutlined />} onClick={() => {
                setInviteMemberVisible(true)
            }}></Button>
            <Avatar.Group size={'small'} maxCount={3}>
                {membersList.map((member, index) => {
                    return <Tooltip title={member.name} key={index} >
                        <Avatar className={cx('avatar')} src={member.photoURL} />
                    </Tooltip>
                })}
            </Avatar.Group>
        </div>
    </div>);
}

export default memo(HeaderChatRom);