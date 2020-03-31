import fetch from "cross-fetch";
import { Dispatch } from "react";
import { AnyAction } from "redux";
import { IState } from "../reducers";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

export const SELECT_SUBREDDIT = "SELECT_SUBREDDIT";
interface ISelectSubreddit {
	type: typeof SELECT_SUBREDDIT;
	subreddit: string;
}
export function selectSubreddit(subreddit: string): ISelectSubreddit {
	return {
		type: SELECT_SUBREDDIT,
		subreddit
	};
}

export const REQUEST_POSTS = "REQUEST_POSTS";
interface IRequestPosts {
	type: typeof REQUEST_POSTS;
	subreddit: string;
}
export function requestPosts(subreddit: string): IRequestPosts {
	return {
		type: REQUEST_POSTS,
		subreddit
	};
}

export const RECEIVE_POSTS = "RECEIVE_POSTS";
interface IReceivePosts {
	type: typeof RECEIVE_POSTS;
	subreddit: string;
	posts: [];
	receiveAt: number;
}
export function receivePosts(subreddit: string, json: any): IReceivePosts {
	return {
		type: RECEIVE_POSTS,
		subreddit,
		posts: json?.data?.children?.map((child: any) => child?.data),
		receiveAt: Date.now()
	};
}

export const INVALIDATE_SUBREDDIT = "INVALIDATE_SUBREDDIT";
interface IInvalidateSubreddit {
	type: typeof INVALIDATE_SUBREDDIT;
	subreddit: string;
}
export function invalidateSubreddit(subreddit: string): IInvalidateSubreddit {
	return {
		type: INVALIDATE_SUBREDDIT,
		subreddit
	};
}

function fetchPosts(subreddit: string) {
	return (dispatch: Dispatch<AnyAction>) => {
		dispatch(requestPosts(subreddit));
		return fetch(`https://www.reddit.com/r/${subreddit}.json`)
			.then(response => response.json())
			.then(result => dispatch(receivePosts(subreddit, result)));
	};
}

function shouldFetchPosts(state: any, subreddit: string) {
	const posts = state?.postsBySubreddit[subreddit];
	if (!posts) {
		return true;
	} else if (posts?.isFetching) {
		return false;
	} else {
		return posts.didInvalidate;
	}
}

export function fetchPostsIfNeeded(subreddit: string) {
	return (dispatch: any, getState: () => IState) => {
		if (shouldFetchPosts(getState(), subreddit)) {
			return dispatch(fetchPosts(subreddit));
		}
	};
}

export type ActionTypes =
	| ISelectSubreddit
	| IReceivePosts
	| IRequestPosts
	| IInvalidateSubreddit;
