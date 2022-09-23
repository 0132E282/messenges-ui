import { Form, Input, Modal } from 'antd';
import { useContext, useState } from 'react';
import { appProviderData } from '~/context/AppProvider';
import { AddDocument } from '~/Firebase/service';
import { uploadFile } from '~/Firebase/service';

function Modals({ title }) {
    const { user, isModal, setIsModal } = useContext(appProviderData);
    const [form] = Form.useForm();
    const [image, setImage] = useState(null);

    const handleOnOk = () => {
        const info = form.getFieldValue();
        uploadFile(image, 'images');
        AddDocument('rom', {
            names: info.names,
            description: info.description,
            members: [
                user.uid
            ],
        })
        // reset form
        form.setFieldValue()
        setIsModal(false);
    }
    return (
        <div>
            <Modal
                title={title}
                visible={isModal}
                onOk={handleOnOk}
                onCancel={() => setIsModal(false)}
            >
                <Form form={form}>
                    <Form.Item title={'nhập  tên nhóm'} name={"avatar"}>
                        <Input type={'file'}
                            onChange={
                                (e) => {
                                    setImage(e.target.files[0]);
                                }
                            }
                        ></Input>
                    </Form.Item>
                    <Form.Item title={'nhập  tên nhóm'} name={"names"}>
                        <Input placeholder="Enter group name"></Input>
                    </Form.Item>
                    <Form.Item title={'nhập description '} name={"description"}>
                        <Input placeholder="Enter group name"></Input>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default Modals