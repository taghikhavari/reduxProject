import React from "react";

interface IProps {
	active: boolean;
	text: string;
	onClick: () => void;
}

const Link: React.FC<IProps> = ({ active, text, onClick }) => {
	if (active) {
		return <span>{text}</span>;
	}

	return (
		<a
			href="/"
			onClick={e => {
				e.preventDefault();
				onClick();
			}}
		>
			{text}
		</a>
	);
};

export default Link;
