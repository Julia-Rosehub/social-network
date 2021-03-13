import React from 'react';
import classNames from 'classnames';
import './Modal.scss';

export default function Modal(props) {
    const { showing, onHide, signIn } = props;
    return (
        <div className={classNames({ 'active': showing }, 'popup')}>
            <div>
                Sign In
        </div>
            <button className="authBtn" onClick={signIn}>
                <img src="https://developers.google.com/identity/images/btn_google_signin_light_normal_web.png" alt="Sign In" />
            </button>
        </div>
    )
}
