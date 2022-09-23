import { createContext, useContext, useMemo, useState, useReducer } from "react";

import { useFireStore } from "~/hook/useFireStore";
import { authContext } from "./AuthProvider";
import Rooms from "~/components/layout/DefaultLayout/components/Rooms";
import { GroupOutlined, HomeFilled } from "@ant-design/icons";
export const appProviderData = createContext();
function AppProvider({ children }) {
    const [selectedRomId, SetSelectedRomId] = useState('')
    const [isModal, setIsModal] = useState(false);
    const [active, setActive] = useState('');
    const [inviteMemberVisible, setInviteMemberVisible] = useState(false);
    // query  to the room 
    const user = useContext(authContext);
    const uid = user.uid || '';
    // conditions , use "useMemo" because it is unnecessary(không cần thiết) change many
    const conditions = useMemo(() => {
        return {
            fieldNames: 'members',
            operator: 'array-contains',
            compareValues: uid,
        }
    }, [uid]);

    const roomList = useFireStore('rom', conditions);
    // fun play when  RoomList, selectedRomId has changed  and selected 
    const selectedRom = useMemo(() => {
        return roomList.find(room => room.id === selectedRomId)
    }, [selectedRomId, roomList]);
    // get user has room to active
    const userConditions = useMemo(() => {
        return {
            fieldNames: 'uid',
            operator: 'in',
            compareValues: selectedRomId ? selectedRom.members : [],
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedRom]);
    const membersList = useFireStore('users', userConditions);
    // handle menu when active
    const init_state = []
    function handleMenu(start, action) {
        switch (action.type) {
            case 'HOME':
                setActive(action.type);
                return start = [
                    {
                        title: 'home',
                        icon: <HomeFilled />,
                        showHeader: true,
                        layout: Rooms,
                        data: roomList,
                    }
                ]
            case "GROUP":
                setActive(action.type);
                return start = [
                    {
                        icon: <GroupOutlined />,
                        title: 'GROUP',
                        layout: Rooms,
                        showHeader: true,
                        data: roomList,
                    }
                ]
            case "LOGOUT":
                console.log("LOGOUT");
                break;
            default:
                return console.error("Invalid action ");
        }
    }
    // eslint-disable-next-line no-undef
    const [ActiveMenu, dispatch] = useReducer(handleMenu, init_state);
    return (
        <appProviderData.Provider value={{
            active,
            membersList,
            selectedRom,
            roomList,
            user,
            isModal,
            setIsModal,
            selectedRomId,
            SetSelectedRomId,
            ActiveMenu,
            dispatch,
            inviteMemberVisible,
            setInviteMemberVisible
        }} >
            {children}
        </appProviderData.Provider>
    );

}

export default AppProvider;