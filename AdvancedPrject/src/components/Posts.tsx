import React from "react";

interface IProps {
	posts: [];
}

export default function Posts(props: IProps) {
	return (
		<ul>
			{props?.posts?.map((post: any, i: number) => (
				<li key={i}>{post.title}</li>
			))}
		</ul>
	);
}
