import React from "react";
import PropTypes from "prop-types";
import Todo from "./Todo";

interface todo {
  completed: boolean;
  text: string;
}

interface IProps{
  todos: todo[];
  onTodoClick: (index: number) => void;
}

const TodoList: React.FC<IProps> = ({ todos, onTodoClick }) => (
	<ul>
		{todos?.map((todo, index) => (
			<Todo key={index} {...todo} onClick={() => onTodoClick(index)} />
		))}
	</ul>
);

export default TodoList;
