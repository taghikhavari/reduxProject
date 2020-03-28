import React from "react";

interface IProps{
  onClick: () => void,
  completed: boolean,
  text: string
};

const Todo: React.FC<IProps> = ({ onClick, completed, text }) => (
	<li
		onClick={onClick}
		style={{
			textDecoration: completed ? "line-through" : "none"
		}}
	>
		{text}
	</li>
);

export default Todo;
