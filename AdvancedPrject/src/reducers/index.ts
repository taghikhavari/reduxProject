import { combineReducers } from "redux";
import {
	ActionTypes,
	SELECT_SUBREDDIT,
	INVALIDATE_SUBREDDIT,
	REQUEST_POSTS,
	RECEIVE_POSTS
} from "../actions";

function selectedSubredditReducer(
	state: string = "react-js",
	action: ActionTypes
) {
	switch (action.type) {
		case SELECT_SUBREDDIT:
			return action.subreddit;
		default:
			return state;
	}
}

interface IPostsState {
	isFetching?: boolean;
	didInvalidate?: boolean;
	items?: [];
	lastUpdated?: number;
}
function postsReducer(
	state: IPostsState = { isFetching: false, didInvalidate: false, items: [] },
	action: ActionTypes
): IPostsState {
	switch (action.type) {
		case INVALIDATE_SUBREDDIT:
			return {
				...state,
				didInvalidate: true
			};
		case REQUEST_POSTS:
			return {
				...state,
				didInvalidate: true
			};
		case RECEIVE_POSTS:
			return {
				...state,
				isFetching: false,
				didInvalidate: false,
				items: action.posts,
				lastUpdated: action?.receiveAt
			};
		default:
			return state;
	}
}

function postsBySubredditReducer(state: IPostsState = {}, action: ActionTypes) {
	switch (action.type) {
		case INVALIDATE_SUBREDDIT:
		case RECEIVE_POSTS:
		case REQUEST_POSTS:
			return {
				...state,
				// @ts-ignore
				[action.subreddit]: postsReducer(state[action.subreddit], action)
			};
		default:
			return state;
	}
}

export interface IState {
	postsBySubreddit: IPostsState;
	selectedSubreddit: string;
}

const rootReducer= combineReducers<IState>({
	postsBySubreddit: postsBySubredditReducer,
	selectedSubreddit: selectedSubredditReducer
});


export default rootReducer;
