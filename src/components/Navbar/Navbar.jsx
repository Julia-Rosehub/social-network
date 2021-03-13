import React from 'react';
import classNames from 'classnames';
import BadgeContainer from './BadgeContainer';
import './Navbar.scss';
import './Badge.scss';
import { NavLink } from "react-router-dom";

const Navbar = (props) => {

    return (
        <div className={classNames('navbar', {
            [`theme_${props.badgeSelectedColor}`]: props.badgeSelectedColor
        })}>
            <nav className='nav'>
                <div className='item'>
                    <NavLink to="/profile" activeClassName='activeLink'>Profile</NavLink>
                </div>
                {/* <div className='item'>
                    <NavLink to="/messages" activeClassName='activeLink'>Messages</NavLink>
                </div> */}
                <div className='item'>
                    <NavLink to="/users" activeClassName='activeLink'>Users</NavLink>
                </div>
                <div className='item'>
                    <NavLink to="/news" activeClassName='activeLink'>News</NavLink>
                </div>
                <div className='item'>
                    <NavLink to="/music" activeClassName='activeLink'>Music</NavLink>
                </div>
                <div className='item'>
                    <NavLink to="/settings" activeClassName='activeLink'>Settings</NavLink>
                </div>
            </nav>

            <hr />

            <div className='themeWrapper'>
                <div className='themeChooser'>
                    <p className='themeHeading'>Color</p>
                    <BadgeContainer />
                    <p className='themeHeading bg'>Background</p>
                    <div id='radioContainer'>
                        <label id='light' className='modes'>
                            <input type='radio' name='mode' value='light' />Light
                        </label>

                        <label id='light' className='modes'>
                            <input type='radio' name='mode' value='dark' />Dark
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;