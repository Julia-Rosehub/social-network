import React from 'react';
import { setBadgeColor } from './../../redux/profile-reducer';
import { connect } from 'react-redux';
import Badge from './Badge';

let mapStateToProps = state => {
    return {
        colors: state.profilePage.colors,
        badgeSelectedColor: state.profilePage.badgeSelectedColor
    }
}

let mapDispatchToProps = dispatch => {
    return {
        setBadgeColor: (id) => {
            dispatch(setBadgeColor(id))
        }
    }
}

export default
    connect(mapStateToProps, mapDispatchToProps)
        (Badge);