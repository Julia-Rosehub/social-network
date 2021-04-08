import { getAuthUserData } from "./auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';
const SET_GLOBAL_ERROR = 'SET_GLOBAL_ERROR';
const ERROR_IS_SHOWING = 'ERROR_IS_SHOWING';

let initialState = {
    initialized: false,
    globalError: null,
    isShowingError: false,
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        case SET_GLOBAL_ERROR:
        case ERROR_IS_SHOWING:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

export const initializedSuccess = () => ({ type: INITIALIZED_SUCCESS });
export const setGlobalError = (globalError) => ({
    type: SET_GLOBAL_ERROR, payload: { globalError }
});
export const setShowingError = (isShowingError) => ({
    type: ERROR_IS_SHOWING, payload: { isShowingError }
})

export const handleUnhandledRejection = (globalError) => async (dispatch) => {
    dispatch(setGlobalError(globalError));
    dispatch(setShowingError(true));
};

export const handleUnhandledRejectionTimeout = () => async (dispatch) => {
    let dismissTimer;
    clearTimeout(dismissTimer);
    dismissTimer = setTimeout(() => dispatch(setShowingError(false)), 5000);
}

export const initializeApp = () => dispatch => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess())
        })
        .catch(error => console.log('error'));
}

export default appReducer;