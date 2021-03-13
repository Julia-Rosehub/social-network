import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { required } from '../../utils/validators/validators';
import { Input } from '../common/FormsControls/FormsControls';
import { login } from '../../redux/auth-reducer';
import { Redirect } from 'react-router-dom';
import s from './Login.module.css';
import styles from './../common/FormsControls/FormsControls.module.css';
import { connect } from 'react-redux';

const LoginForm = ({ handleSubmit, error, captchaUrl }) => {

    return <form onSubmit={handleSubmit}>
        <div>
            <Field placeholder={'Email'}
                name={'email'}
                component={Input}
                validate={[required]} />
        </div>
        <div>
            <Field placeholder={'Password'}
                type={'password'}
                name={'password'}
                component={Input}
                validate={[required]} />
        </div>
        <div className={s.rememberMeCheckout}>
            <Field type={'checkbox'} name={'rememberMe'} component={Input} /> remember me
        </div>
        {captchaUrl && <img src={captchaUrl} />}

        {error && <div className={styles.formSummaryError}>
            {error}
        </div>}
        <div>
            <button>Login</button>
        </div>
    </form>
}

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe);
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'} />
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { login })(Login);
