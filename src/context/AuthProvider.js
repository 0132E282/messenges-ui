import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { auth } from '~/Firebase/config'
import toRouter from "~/Router/toRouter";

export const authContext = createContext();
const HandleLoginGoogle = ({ children }) => {
    // set start when it have user setUser
    const [user, setUser] = useState({});
    // set start when it loading 
    const [isLoading, setIsLoading] = useState(true);
    // custom hooks of use react-router-dom 
    let navigate = useNavigate();
    // login with google 
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
                setIsLoading(false);
                return navigate(toRouter.ChatRom, { replace: true });
            } else {
                setIsLoading(false);
                return navigate(toRouter.Login, { replace: true });
            }
        })
        // clear function 
        return () => {
            unsubscribe()
        }
    }, [navigate]);
    return (
        <authContext.Provider value={user}>
            {isLoading ? <LoadingOutlined /> : children}
        </authContext.Provider>
    )
}
HandleLoginGoogle.prototype = {
    e: PropTypes.func.isRequired,
    replace: PropTypes.bool
}
export default HandleLoginGoogle
