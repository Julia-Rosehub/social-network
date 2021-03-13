import React from 'react';
import { reduxForm, Field } from 'redux-form';
import s from './Dialogues.module.css';
import DialogueItem from "./DialogueItem/DialogueItem";
import Message from "./Message/Message";
import { required, maxLengthCreator } from '../../utils/validators/validators';
import { Textarea } from '../common/FormsControls/FormsControls';

const maxLengthCreator100 = maxLengthCreator(100);

const Dialogues = (props) => {

    let state = props.dialoguesPage;

    let dialoguesElements = state.dialogues.map(d => <DialogueItem
        name={d.name}
        id={d.id}
        key={d.id}
    />);
    let messagesElements = state.messages.map(m => <Message
        message={m.message}
        key={m.id}
    />);

    let addNewMessage = (values) => {
        props.sendMessage(values.newMessageBody);
    }

    return (
        <div className={s.dialogues}>
            <div className={s.dialoguesItems}>
                {dialoguesElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <DialoguesReduxForm onSubmit={addNewMessage} />
            </div>
        </div >
    )
}

const AddMessageForm = props => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea}
                    validate={[required, maxLengthCreator100]}
                    name='newMessageBody'
                    placeholder='Enter your message'>
                </Field>
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

const DialoguesReduxForm = reduxForm({ form: 'dialoguesForm' })(AddMessageForm)


export default Dialogues;