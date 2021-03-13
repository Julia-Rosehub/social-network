import React, { memo } from 'react';
import { reduxForm, Field } from 'redux-form';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import { required, maxLengthCreator } from '../../../utils/validators/validators';
import { Textarea } from '../../common/FormsControls/FormsControls';

const maxLengthCreator30 = maxLengthCreator(30);

const MyPosts = memo(props => {

    let postsElements =
        props.posts.map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount} />);

    let addNewPost = (values) => {
        props.addPost(values.newPostText);
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <PostsReduxForm onSubmit={addNewPost} />
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
});

const AddPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name='newPostText'
                    placeholder='Add new message'
                    validate={[required, maxLengthCreator30]} />
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

const PostsReduxForm = reduxForm({ form: 'postsForm' })(AddPostForm)
export default MyPosts;