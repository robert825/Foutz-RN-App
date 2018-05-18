import { database } from "../../config/firebase";

export function addPost(post, callback) {
    const { userId } = post;
    const newPostRef = database.ref().child('posts').push();
    const newPostKey = newPostRef.key;

    post.id = newPostKey;

    // Write the new post data simultaneously in the posts list and the user's posts list.
    let updates = {};
    updates['/posts/' + newPostKey] = post;
    updates['/user-posts/' + userId + '/' + newPostKey] = post;

    database.ref().update(updates)
        .then(() => callback(true, post, null))
        .catch((error) => callback(false, null, error));
}

export function getPosts(callback) {
    const postsRef = database.ref('posts');

    //start listening for new data
    postsRef.on('value', function(snapshot) {
        callback(true, snapshot, null)
    });
}

export function updatePost(post, callback) {
    const { id, userId } = post;

    let updates = {};
    updates['posts/' + id] = post;
    updates['/user-posts/' + userId + '/' + id] = post;

    database.ref().update(updates)
        .then(() => callback(true, post, null))
        .catch((error) => callback(false, null, error));
}

export function deletePost(post, callback) {
    const { id, userId } = post;

    let updates = {};
    updates['posts/' + id] = null;
    updates['/user-posts/' + userId + '/' + id] = null;

    database.ref().update(updates)
        .then(() => callback(true, post, null))
        .catch((error) => callback(false, null, error));
}

export function toggleLove(data, callback) {
    const { post, uid } = data;
    const postRef = database.ref('posts/' + post.id);

    postRef.transaction(function(post) {
        if (post) {
            if (post.loves && post.loves[uid]) {
                post.loveCount--;
                post.loves[uid] = null;
            } else {
                post.loveCount++;
                if (!post.loves) post.loves = {};
                post.loves[uid] = true;
            }
        }

        return post;

    }, function(error, committed, snapshot) {
        if (error || !committed) callback(false, null, error)
        else callback(true, snapshot.val(), null)
    });
}