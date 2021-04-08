import profileReducer, { addPost, deletePost } from './profile-reducer';

const state = {
  posts: [
    { id: 1, message: 'Hi, how are you?', likesCount: 12 },
    { id: 2, message: 'It\'s my first post', likesCount: 11 },
    { id: 3, message: 'Blabla', likesCount: 11 },
    { id: 4, message: 'Dada', likesCount: 11 }
  ]
};

describe('profileReducer', () => {
  it('length of posts should be incremented', () => {
    let action = addPost('Hey Jude');
    let newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(5);
  });

  it('message of new post should be the following', () => {
    let action = addPost('Hey Jude');
    let newState = profileReducer(state, action);
    expect(newState.posts[4].message).toBe('Hey Jude');
  });

  it('after deleting length of messages should be decremented', () => {
    let action = deletePost(1);
    let newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(3);
  });
});

