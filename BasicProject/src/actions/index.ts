export const ADD_TODO = "ADD_TODO";
export const TOGGLE_TODO = "TOGGLE_TODO";
export const SET_VISIBILITY_FILTER = "SET_VISIBILITY_FILTER";

export enum EVisibilityFilters {
	SHOW_ALL = "SHOW_ALL",
	SHOW_COMPLETED = "SHOW_COMPLETED",
	SHOW_ACTIVE = "SHOW_ACTIVE"
}

interface IAddTodo {
	type: typeof ADD_TODO;
	text: string;
}

interface IToggleTodo {
	type: typeof TOGGLE_TODO;
	index: number;
}

interface IVisibilityFilterAction {
	type: typeof SET_VISIBILITY_FILTER;
	filter: EVisibilityFilters;
}

export function addTodo(text: string): IAddTodo {
	return {
		type: ADD_TODO,
		text
	};
}

export function toggleTodo(index: number): IToggleTodo {
	return {
		type: TOGGLE_TODO,
		index
	};
}

export function setVisibilityFilter(
	filter: EVisibilityFilters
): IVisibilityFilterAction {
	return {
		type: SET_VISIBILITY_FILTER,
		filter
	};
}

export type todoActionTypes = IAddTodo | IToggleTodo | IVisibilityFilterAction;
