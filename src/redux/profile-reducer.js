import { profileAPI, usersAPI } from '../api/api';
const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SELECT_BADGE_COLOR = 'SELECT_BADGE_COLOR';

let initialState = {
    posts: [
        { id: 1, message: 'Hi, how are you?', likesCount: 12 },
        { id: 2, message: 'Is it your first time here?', likesCount: 11 },
        { id: 3, message: 'Pleased to meet you!', likesCount: 11 },
        { id: 4, message: 'Would U like to take a walk with me?', likesCount: 11 }
    ],
    profile: null,
    status: '',
    colors: [
        { id: 1, name: 'blue' },
        { id: 2, name: 'yellow' },
        { id: 3, name: 'pink' },
        { id: 4, name: 'green' },
        { id: 5, name: 'purple' },
        { id: 6, name: 'coral' },
        { id: 7, name: 'grey' },
        { id: 8, name: 'rosybrown' }
    ],
    badgeSelectedColor: 'blue'
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5,
                message: action.newPost,
                likesCount: 0
            };
            return {
                ...state,
                newPostText: '',
                posts: [...state.posts, newPost]
            };
        case DELETE_POST:
            return { ...state, posts: state.posts.filter(p => p.id != action.postId) }
        case SET_USER_PROFILE:
            return { ...state, profile: action.profile };
        case SET_STATUS:
            return {
                ...state, status: action.status
            }
        case SELECT_BADGE_COLOR:
            return {
                ...state, badgeSelectedColor: state.colors.filter(color => color.id === action.id)[0].name
            }
        default:
            return state;
    }
}

export const addPost = (newPost) => ({ type: ADD_POST, newPost });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
export const setStatus = status => ({ type: SET_STATUS, status });
export const deletePost = postId => ({ type: DELETE_POST, postId });
export const setBadgeColor = id => ({ type: SELECT_BADGE_COLOR, id });

export const getUserProfile = (userId) => async (dispatch) => {
    let response = await usersAPI.getProfile(userId);
    dispatch(setUserProfile(response.data));
}

export const getUserStatus = userId => async (dispatch) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(setStatus(response.data));
}

export const updateUserStatus = status => async (dispatch) => {
    try {
        let response = await profileAPI.updateStatus(status);
        if (!response.data.resultCode) {
            dispatch(setStatus(status));
        }
    } catch (error) {

    }
}

export default profileReducer;