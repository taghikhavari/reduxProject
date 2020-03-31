import React, { Dispatch, useEffect } from "react";
import { connect } from "react-redux";
import {
	selectSubreddit,
	fetchPostsIfNeeded,
	invalidateSubreddit
} from "../actions";
import Picker from "../components/Picker";
import Posts from "../components/Posts";
import { AnyAction } from "redux";
import { IState } from "../reducers";

interface IProps {
	selectedSubreddit: string;
	posts: [];
	isFetching: boolean;
	lastUpdated: number;
	dispatch: Dispatch<AnyAction>;
}

const AsyncApp = (props: IProps) => {
	const { selectedSubreddit, posts, isFetching, lastUpdated } = props;

	useEffect(() => {
		const { dispatch, selectedSubreddit } = props;
		dispatch(fetchPostsIfNeeded(selectedSubreddit) as any);
	}, [props.selectedSubreddit]);

	const handleChange = (nextSubreddit: string) => {
		props.dispatch(selectSubreddit(nextSubreddit));
		props.dispatch(fetchPostsIfNeeded(nextSubreddit) as any);
	};

	const handleRefreshClick = (e: any) => {
		e.preventDefault();

		const { dispatch, selectedSubreddit } = props;
		dispatch(invalidateSubreddit(selectedSubreddit));
		dispatch(fetchPostsIfNeeded(selectedSubreddit) as any);
	};

	return (
		<div>
			<Picker
				value={selectedSubreddit}
				onChange={handleChange}
				options={["reactjs", "frontend"]}
			/>
			<p>
				{lastUpdated && (
					<span>
						Last updated at {new Date(lastUpdated).toLocaleTimeString()}.{" "}
					</span>
				)}
				{!isFetching && <button onClick={handleRefreshClick}>Refresh</button>}
			</p>
			{isFetching && posts.length === 0 && <h2>Loading...</h2>}
			{!isFetching && posts.length === 0 && <h2>Empty.</h2>}
			{posts.length > 0 && (
				<div style={{ opacity: isFetching ? 0.5 : 1 }}>
					<Posts posts={posts} />
				</div>
			)}
		</div>
	);
};

const mapState = (state: IState) => {
	const { selectedSubreddit, postsBySubreddit } = state;
	//@ts-ignore
	const { isFetching, lastUpdated, items: posts } = postsBySubreddit[
		selectedSubreddit
	] || {
		isFetching: true,
		items: []
	};

	return {
		selectedSubreddit,
		posts,
		isFetching,
		lastUpdated
	};
};

export default connect(mapState)(AsyncApp);
