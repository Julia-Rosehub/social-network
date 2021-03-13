import React from 'react';
import { logout, } from '../../redux/auth-reducer';
import { handleUnhandledRejection } from '../../redux/app-reducer';
import Header from './Header';
import { connect } from 'react-redux';

class HeaderContainer extends React.Component {

    render() {
        return <Header {...this.props} handleUnhandledRejection={this.props.handleUnhandledRejection} />
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    isLookingForAJob: state.auth.setAvatarPhoto,
    badgeSelectedColor: state.profilePage.badgeSelectedColor,
    colors: state.profilePage.colors,
    globalError: state.app.globalError
})

export default connect(mapStateToProps, { logout, handleUnhandledRejection })(HeaderContainer);
