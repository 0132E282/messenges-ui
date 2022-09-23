import classNames from "classnames/bind";
import styles from './Menu.model.scss';
import Tippy from "@tippyjs/react/headless";
import { useContext } from "react";
import { appProviderData } from "~/context/AppProvider";
import { auth } from "~/Firebase/config";
const cx = classNames.bind(styles);
function MenuItem({ icon, action, names, defaultValue, ...propPass }) {
    const { dispatch, active } = useContext(appProviderData);
    const handleActionClick = () => {
        if (action) {
            dispatch({
                type: action
            })
        }
    }
    return (!defaultValue.children ?
        <div
            className={cx('menu-item', active === action ? 'active' : '')}
            onClick={handleActionClick}
            {...propPass}>
            {icon} {names ?? <h1>{names}</h1>}
        </div> :
        <>
            <Tippy
                placement={'right-end'}
                offset={[10, 0]}
                interactive={true}
                render={attrs => (
                    <div  {...attrs} className={'children-wrapper'}>
                        {defaultValue.children.map((value, index) => {
                            return <div className={cx('children-item')} key={index} onClick={() => {
                                auth.signOut()
                            }}>
                                <div className={cx('children-icon')}>
                                    {value.icon}
                                </div>
                                <div className={cx('children-name')}>
                                    {value.title}
                                </div>
                            </div>
                        })}
                    </div>
                )}
            >
                <div className={cx('menu-item')}>
                    {icon}
                </div>
            </Tippy>
        </>);
}

export default MenuItem;