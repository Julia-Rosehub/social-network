import React from 'react';
import s from './../Dialogues.module.css';

const Message = (props) => {
    return <div className={s.dialogue}>{props.message}</div>
}

export default Message;