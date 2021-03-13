import React, { useState } from 'react';
import classNames from 'classnames';
import SearchBar from './../common/SearchBar';
import SignIn from './../SignIn/SignIn';
import logo from './../../assets/images/logo.png';

import './Header.scss';
import { NavLink } from "react-router-dom";

const Header = (props) => {
    const [visibleDropdown, setVisibleDropdown] = useState(false);

    return (
        <>
            <header className={classNames('header',
                { [`active_${props.badgeSelectedColor}`]: props.badgeSelectedColor })}>
                <div className='headerNavigation'>
                    <div className='item'>
                        <NavLink to="/messages" activeClassName='activeLink'>messages</NavLink>
                    </div>
                </div>
                <div className='searchAndLoginArea'>
                    <img className='logo' src={logo} />

                    <SearchBar />
                    <SignIn handleUnhandledRejection={props.handleUnhandledRejection} />
                    <div className='loginBlock'>

                        {!props.isAuth && !props.avatarPhoto ? ''
                            : props.avatarPhoto ?
                                <figure><img className='loginBlock__foto' onClick={() => setVisibleDropdown(!visibleDropdown)} src={props.avatarPhoto} /></figure>
                                : <figure><img className='loginBlock__foto' onClick={() => setVisibleDropdown(!visibleDropdown)} src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ1EHSk9yFepmWdqEQEvYBgOCyZze72b707lw&usqp=CAU' /></figure>
                        }

                    </div>
                </div>
            </header>
            {visibleDropdown && <div className='profileDropdown'>
                {props.isAuth
                    ? <h5 className='loginBlock__name'>{props.login} - <button onClick={props.logout}>Logout</button>
                    </h5>
                    : ''
                }
            </div>}
        </>
    )
}

export default Header;