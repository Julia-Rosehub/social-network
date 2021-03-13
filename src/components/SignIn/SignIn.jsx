import React from 'react';
import './SignIn.scss';
import Modal from './../Modal/Modal';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showing: false,
            disabled: true,
        };
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.signOut = this.signOut.bind(this);
        this.signIn = this.signIn.bind(this);
    }
    async componentDidMount() {
        const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
        if (!clientId) return;
        window.gapi.load('auth2', () => { // // Retrieve the singleton for the GoogleAuth library and set up the client.
            if (!window.gapi.auth2.getAuthInstance()) {
                window.gapi.auth2.init({ client_id: clientId }).then(() => {
                    this.setState({ disabled: false });
                });
            }
        });
        await this.loadData();
    }

    async loadData() {
        const apiEndpoint = process.env.REACT_APP_UI_AUTH_ENDPOINT;
        const response = await fetch(`${apiEndpoint}/user`, {
            method: 'POST',
        });
        const body = await response.text();
        const result = JSON.parse(body);
        const { signedIn, givenName } = result;
        this.setState({ user: { signedIn, givenName } });
    }

    async signIn() {
        this.hideModal();

        let googleToken;
        try {
            const auth2 = window.gapi.auth2.getAuthInstance();
            const googleUser = await auth2.signIn();
            googleToken = googleUser.getAuthResponse().id_token;
        } catch (error) {
            console.log(error.error);
        }

        try {
            const apiEndpoint = process.env.REACT_APP_UI_AUTH_ENDPOINT;
            const response = await fetch(`${apiEndpoint}/signin`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ google_token: googleToken }),
            });
            const body = await response.text();
            const result = JSON.parse(body);
            const { signedIn, givenName } = result;
            this.setState({ user: { signedIn, givenName } });
        } catch (error) {
            console.log(error.error)
        }
    }

    async signOut() {
        const apiEndpoint = process.env.REACT_APP_UI_AUTH_ENDPOINT;
        try {
            await fetch(`${apiEndpoint}/signout`, {
                method: 'POST',
            });
            const auth2 = window.gapi.auth2.getAuthInstance();
            await auth2.signOut();
            this.setState({ user: { signedIn: false, givenName: '' } });
        } catch (error) {
            console.log(error);
        }
    }

    showModal() {
        const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
        if (!clientId) {
            console.log('Missing environment variable GOOGLE_CLIENT_ID');
            return;
        }
        this.setState({ showing: true });
    }

    hideModal() {
        this.setState({ showing: false });
    }

    render() {
        const { user, showing } = this.state;
        if (user && user.signedIn) {
            return (
                <div>
                    <div className="signOut" onMouseEnter={() => console.log('leave')}>
                        {user.givenName}
                        <div onClick={this.signOut}>Sign out</div>
                    </div>
                </div>
            );
        }
        return (
            <div>
                <div className="signIn" onClick={this.showModal}>
                    Sign In
                         </div>
                {showing && <Modal showing={showing}
                    signIn={this.signIn}
                    onHide={this.hideModal} />}
            </div>
        );
    }
}

export default SignIn;

