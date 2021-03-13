import React, { Component, Suspense, lazy } from 'react';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import UsersContainer from './components/Users/UsersContainer';
import Toast from './components/Toast/Toast';
import Login from './components/Login/Login';
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import Preloader from './components/common/Preloader';
import { withRouter } from 'react-router-dom'
import { compose } from 'redux';
import { initializeApp, handleUnhandledRejection, handleUnhandledRejectionTimeout } from './redux/app-reducer';

const DialoguesContainer = lazy(() => import('./components/Dialogues/DialoguesContainer'));
const ProfileContainer = lazy(() => import('./components/Profile/ProfileContainer'));

class App extends Component {

    constructor(props) {
        super(props)

        this.state = {
            showing: false,
        }
    }

    catchAllUnhandledErrors = (event) => {
        this.props.handleUnhandledRejection(event.reason.message);
    }

    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener('unhandledrejection', (event) => {
            this.catchAllUnhandledErrors(event);
        });
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors);
    }

    componentDidUpdate(prevProps) {

        if (prevProps !== this.props) {
            this.props.handleUnhandledRejectionTimeout();
        }
    }

    render() {
        if (!this.props.initialized) return <Preloader />

        return (

            <div className='app-wrapper'>
                <HeaderContainer />

                <Navbar
                    badgeSelectedColor={this.props.badgeSelectedColor}
                />

                <div className='app-wrapper-content'>
                    <Switch>
                        <Route exact path='/'
                            render={() => <Redirect to={'/profile'} />} />
                        <Route path='/messages'
                            render={() => {
                                return <Suspense fallback={<div>Loading...</div>}>
                                    <DialoguesContainer />
                                </Suspense>
                            }} />
                        <Route path='/profile/:userId?'
                            render={() => {
                                return <Suspense fallback={<div>Loading...</div>}>
                                    <ProfileContainer />
                                </Suspense>
                            }} />
                        <Route path='/users'
                            render={() => <UsersContainer />} />
                        <Route path='/login'
                            render={() => <Login />} />
                        <Route path='*' render={() => <div>NOT FOUND</div>} />
                    </Switch>
                    {this.props.isShowingError && <Toast
                        {...this.props}
                    />
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    initialized: state.app.initialized,
    globalError: state.app.globalError,
    isShowingError: state.app.isShowingError,
    badgeSelectedColor: state.profilePage.badgeSelectedColor
})

export default compose(
    withRouter,
    connect(mapStateToProps, {
        initializeApp, handleUnhandledRejection, handleUnhandledRejectionTimeout
    }))(App);