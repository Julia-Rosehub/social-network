import React, { useState, useEffect } from 'react';

import s from './ProfileStatus.module.css';

const ProfileStatusWithHooks = (props) => {

    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status)
    }, [props.status]);

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateUserStatus(status);
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <>
            {!editMode &&
                <div className={s.userStatus}>
                    <span onDoubleClick={activateEditMode}>{props.status || '-------'}</span>
                </div>
            }
            {editMode &&
                <div className={s.userStatus}>
                    <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={status} />
                </div>
            }
        </>
    )
}

export default ProfileStatusWithHooks;
