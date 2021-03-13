import { authAPI, securityAPI } from '../api/api';
import * as axios from 'axios';
import { stopSubmit } from 'redux-form';
const SET_USER_DATA = 'luminous-network/auth/SET_USER_DATA';
const SET_AVATAR_PHOTO = 'luminous-network/auth/SET_AVATAR_PHOTO';
const GET_CAPTCHA_URL_SUCCESS = 'luminous-network/auth/GET_CAPTCHA_URL_SUCCESS';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isFetching: false,
    isAuth: false,
    avatarPhoto: null,
    captchaUrl: null // if null, captcha is not required
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        case SET_AVATAR_PHOTO:
            return {
                ...state,
                avatarPhoto: action.avatarPhoto
            }
        default:
            return state;
    }
}

export const setAuthUserData = (userId, email, login, isAuth) => ({
    type: SET_USER_DATA, payload:
        { userId, email, login, isAuth }
});

export const getCaptchaUrlSuccess = (captchaUrl) => ({
    type: GET_CAPTCHA_URL_SUCCESS, payload: { captchaUrl }
});

export const setAvatarPhoto = (avatarPhoto) => ({ type: SET_AVATAR_PHOTO, avatarPhoto: avatarPhoto });

export const getAuthUserData = () => async (dispatch) => {
    let response = await authAPI.me();
    if (response.data.resultCode === 0) {
        let { id, email, login } = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
        axios.get('https://social-network.samuraijs.com/api/1.0/profile/' + id)
            .then(({ data }) => {
                dispatch(setAvatarPhoto(data.photos.small));
            });
    }
}

export const login = (email, password, rememberMe) => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe);

    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData());
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl());
        }

        const message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error occured'
        dispatch(stopSubmit('login', { _error: message }));
    }
}

export const logout = () => async (dispatch) => {
    const response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}

export const getCaptchaUrl = () => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl));
}

export default authReducer;