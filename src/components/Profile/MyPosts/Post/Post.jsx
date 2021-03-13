import React from 'react';
import { FaRegHeart } from 'react-icons/fa';
import s from './Post.module.css';

const Post = (props) => {
    return (
        <div className={s.item}>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ1EHSk9yFepmWdqEQEvYBgOCyZze72b707lw&usqp=CAU' />
            { props.message}
            <div>
                <span><FaRegHeart /></span> {props.likesCount}
            </div>
        </div>
    )
}

export default Post;