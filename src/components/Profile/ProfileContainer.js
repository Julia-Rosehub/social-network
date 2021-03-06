import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Profile from './Profile';
import { getUserProfile, getUserStatus, updateUserStatus } from '../../redux/profile-reducer';
import { withRouter } from 'react-router-dom'
import { withAuthRedirect } from '../../hoc/withAuthRedirect';

class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                this.props.history.push('/login');
            }
        }
        this.props.getUserProfile(userId);
        this.props.getUserStatus(userId);
    }

    render() {
        return (
            <>
                <Profile {...this.props}
                />
            </>
        )
    }
}

let mapStateToProps = state => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
});

export default compose(
    connect(mapStateToProps, { getUserProfile, getUserStatus, updateUserStatus }),
    withRouter,
    withAuthRedirect
)(ProfileContainer)


