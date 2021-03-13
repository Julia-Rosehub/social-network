import React from 'react';
import './Toast.scss';

function Toast(props) {
    const { globalError } = props;

    return (
        <div className='toastMessage'>
            {globalError}
        </div>
    )
}

export default Toast
