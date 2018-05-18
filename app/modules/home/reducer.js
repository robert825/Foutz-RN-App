import * as t from './actionTypes';

let initialState = {
    isLoading: false,
    posts: []
};

const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case t.LOADING_POSTS: {
            const posts = state.posts;

            //show loading signal
            if (posts.length === 0) return {...state, isLoading: true}

            return state;
        }

        case t.POSTS_AVAILABLE: {
            let { data } = action;
            let posts = [];

            //convert the snapshot (json object) to array
            data.forEach(function (childSnapshot) {
                const item = childSnapshot.val();
                item.key = childSnapshot.key;

                posts.push(item);
            });

            posts.reverse();

            return {...state, posts, isLoading: false};
        }

        case t.LOGGED_OUT: {
            return {...state, posts: []};
        }

        default:
            return state;
    }
};

export default homeReducer;