import React from 'react';
import Dialogues from "./Dialogues";
import { sendMessage } from "../../redux/dialogues-reducer";
// import StoreContext from '../../StoreContext';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';

// const DialoguesContainer = () => {
//     return <StoreContext.Consumer>
//         {
//             (store) => {
//                 let state = store.getState().dialoguesPage;

//                 let onSendMessageClick = () => {
//                     store.dispatch(sendMessageCreator());
//                 }

//                 let onNewMessageChange = (body) => {
//                     store.dispatch(updateNewMessageBodyCreator(body));
//                 }

//                 return (
//                     <Dialogues updateNewMessageBody={onNewMessageChange}
//                         sendMessage={onSendMessageClick}
//                         dialoguesPage={state}
//                     />
//                 )
//             }}
//     </StoreContext.Consumer>
// }

let mapStateToProps = state => {
    return {
        dialoguesPage: state.dialoguesPage,
    }
}

// let mapDispatchToProps = dispatch => {
//     return {
//         sendMessage: (newMessageBody) => {
//             dispatch(sendMessageCreator(newMessageBody));
//         }
//     }
// }

// compose(
//     connect(mapStateToProps, mapDispatchToProps),
//     withAuthRedirect
// )(Dialogues)

// let AuthRedirectComponent = withAuthRedirect(Dialogues);

// const DialoguesContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);

export default compose(
    connect(mapStateToProps, { sendMessage }),
    withAuthRedirect
)(Dialogues);

