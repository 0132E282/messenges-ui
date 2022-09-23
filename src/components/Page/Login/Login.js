import React from 'react';
import classnames from 'classnames/bind';
import { Row, Col, Button, Typography } from 'antd';
import { GooglePlusOutlined, FacebookOutlined } from '@ant-design/icons';
import { signInWithGoogle, auth } from '~/Firebase/config'

import styles from './Login.module.scss';


const cx = classnames.bind(styles);
const { Title } = Typography
function Login() {
    return (<div className={cx("wrapper")}>
        <Row >
            <Col span={24} >
                <Title className={cx("heading")}>login</Title>
                <Button className={cx("btn")} onClick={(e) => { signInWithGoogle(e) }} > <GooglePlusOutlined className={cx('btn-icon')} />  login by google</Button>
                <Button className={cx("btn")}> <FacebookOutlined className={cx('btn-icon')} /> login by Facebook</Button>
            </Col>
        </Row>
    </div>);
}

export default Login;