import { Form, Input, Modal, Select } from 'antd';
import { useContext, useEffect, useState } from 'react';

import { appProviderData } from '~/context/AppProvider';
import { collection, orderBy, query, where, limit, getDocs } from 'firebase/firestore';
import { db } from '~/Firebase/config';
import { updateDates } from '~/Firebase/service';
function ModalAddVisible({ title }) {
    const { Option } = Select;
    const { inviteMemberVisible, setInviteMemberVisible, selectedRom, selectedRomId } = useContext(appProviderData);
    const [searchValue, setSearchValue] = useState('');
    const [resultSearch, setResultSearch] = useState([]);
    useEffect(() => {
        const q = query(collection(db, "users"),
            where('keyWorks', 'array-contains', searchValue),
            orderBy('name'),
            limit(5)
        )
        getDocs(q)
            .then(docs => {
                setResultSearch(docs.docs)
            })
    }, [searchValue]);
    const handleOnOk = () => {
        const members = [...selectedRom.members, ...resultSearch.map(value => value.data().uid)]
        updateDates('rom', selectedRomId, {
            members: members
        })
    }
    return (
        <div>
            <Modal
                title={title}
                visible={inviteMemberVisible}
                onOk={handleOnOk}
                onCancel={() => setInviteMemberVisible(false)}
            >
                <Select
                    showSearch
                    mode="tags"
                    style={{ width: '100%' }}
                    placeholder="select one country"
                    optionLabelProp="label"
                    onSearch={(data) => {
                        setSearchValue(data)
                    }}
                >
                    {resultSearch && resultSearch.map((doc, index) => {
                        const item = doc.data();
                        return <Option key={index} value={item.name} label={item.name}>
                            <div className="demo-option-label-item">
                                <span role="img" aria-label={item.name}>
                                    {item.name}
                                </span>
                            </div>
                        </Option>
                    })}
                </Select>
            </Modal>
        </div>
    );
}

export default ModalAddVisible