import React from 'react';
import { follow, unfollow, setCurrentPage, requestUsers, toggleIsFetching, toggleFollowingProgress } from '../../redux/users-reducer';
import { getUsers, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress } from '../../redux/users-selectors';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Users from './Users';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import Preloader from '../common/Preloader';

class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize);
        this.props.toggleIsFetching(true);
    }

    onPageChanged = pageNumber => {
        this.props.requestUsers(pageNumber, this.props.pageSize);
        this.props.setCurrentPage(pageNumber);
    }

    render() {

        return <>
            {this.props.isFetching ?
                <Preloader /> : null}
            <Users {...this.props} onPageChanged={this.onPageChanged} />
        </>
    }

}

let mapStateToProps = state => {

    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
}

export default compose(
    connect(mapStateToProps, {
        follow,
        unfollow,
        setCurrentPage,
        toggleFollowingProgress,
        requestUsers,
        toggleIsFetching
    }),
)(
    UsersContainer
)