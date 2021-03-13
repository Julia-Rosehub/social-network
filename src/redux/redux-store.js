import { combineReducers, createStore, applyMiddleware } from "redux";
import profileReducer from "./profile-reducer";
import dialoguesReducer from "./dialogues-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import appReducer from "./app-reducer";
import authReducer from './auth-reducer';
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';

let reducers = combineReducers({
    profilePage: profileReducer,
    dialoguesPage: dialoguesReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
})

let store = createStore(reducers,
    applyMiddleware(thunkMiddleware)
);

window.store = store;

export default store;