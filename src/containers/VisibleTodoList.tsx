import { EVisibilityFilters, toggleTodo } from "../actions";
import { IState } from "../reducers";
import { connect } from "react-redux";
import TodoList from "../components/TodoList";

interface ITodo {
	text: string;
	completed: boolean;
}

const getVisibleTodos = (todos: ITodo[], filter: EVisibilityFilters) => {
	switch (filter) {
		case "SHOW_COMPLETED":
			return todos.filter(t => t.completed);
		case "SHOW_ACTIVE":
			return todos.filter(t => !t.completed);
		case "SHOW_ALL":
		default:
			return todos;
	}
};

const mapStateToProps = (state: IState) => {
	return {
		todos: getVisibleTodos(state.todos, state.visibilityFilter)
	};
};

const mapDispatchToProps = (dispatch: any) => {
  return {
		onTodoClick: (id: number) => dispatch(toggleTodo(id))
	};
}

const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList);

export default VisibleTodoList;