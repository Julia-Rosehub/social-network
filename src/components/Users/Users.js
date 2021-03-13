import React from 'react';
import Paginator from './../common/Paginator';
import { NavLink } from 'react-router-dom';

import s from './Users.module.css';
import userPhoto from '../../assets/images/user.png'

const Users = (props) => {

    return (
        (
            <div>

                <Paginator totalItemsCount={props.totalUsersCount}
                    pageSize={props.pageSize}
                    currentPage={props.currentPage}
                    onPageChanged={props.onPageChanged} />
                {
                    props.users.map(u => <div key={u.id}>
                        <span>
                            <div>
                                <NavLink to={'/profile/' + u.id}>
                                    <img src={u.photos.small != null ? u.photos.small : userPhoto} className={s.userPhoto} />
                                </NavLink>
                            </div>
                            <div>
                                {u.followed
                                    ? <button
                                        disabled={props.followingInProgress.some(id => id === u.id)}
                                        onClick={() => {
                                            props.unfollow(u.id);
                                        }}>Unfollow</button>
                                    : <button
                                        disabled={props.followingInProgress.some(id => id === u.id)}
                                        onClick={() => {
                                            props.follow(u.id)
                                        }}>Follow</button>
                                }
                            </div>
                        </span>
                        <span>
                            <span>
                                <div>{u.name}</div>
                                <div>{u.status}</div>
                            </span>
                            <span>
                                <div>{'u.location.city'}</div>
                                <div>{'u.location.country'}</div>
                            </span>
                        </span>
                    </div>
                    )
                }
            </div >
        )
    )
}

export default Users;