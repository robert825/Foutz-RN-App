
import * as t from './actionTypes';
import * as api from './api';

// Add Post - CREATE (C)
export function addPost(post, successCB, errorCB) {
    return (dispatch) => {
        api.addPost(post, function (success, data, error) {
            if (success) successCB();
            else if (error) errorCB(error)
        });
    };
}

// Get Posts - READ (R)
export function getPosts(errorCB) {
    return (dispatch) => {
        dispatch({type: t.LOADING_POSTS});
        api.getPosts(function (success, data, error) {
            if (success) dispatch({type: t.POSTS_AVAILABLE, data});
            else if (error) errorCB(error)
        });
    };
}

// Update Post - UPDATE (U)
export function updatePost(post, successCB, errorCB) {
    return (dispatch) => {
        api.updatePost(post, function (success, data, error) {
            if (success) successCB();
            else if (error) errorCB(error)
        });
    };
}

// Delete Post - DELETE (D)
export function deletePost(post, errorCB) {
    return (dispatch) => {
        api.deletePost(post, function (success, data, error) {
            if (error) errorCB(error)
        });
    };
}

// Like/Unlike
export function toggleLove(data, errorCB) {
    return (dispatch) => {
        dispatch({type: t.LOADING_POSTS});
        api.toggleLove(data, function (success, data, error) {
            if (error) errorCB(error)
        });
    };
}