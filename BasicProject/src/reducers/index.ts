import {
	todoActionTypes,
	EVisibilityFilters,
	SET_VISIBILITY_FILTER,
	ADD_TODO,
	TOGGLE_TODO
} from "../actions";
import { combineReducers } from "redux";

interface todo {
	text: string;
	completed: boolean;
}

export interface IState {
	visibilityFilter: EVisibilityFilters;
	todos: todo[];
}

const initialState: IState = {
	visibilityFilter: EVisibilityFilters.SHOW_ALL,
	todos: [
		{
			text: "Consider using Redux",
			completed: true
		},
		{
			text: "Keep all state in a single tree",
			completed: false
		}
	]
};

function todoReducer(state: todo[] = [], action: todoActionTypes) {
	switch (action.type) {
		case ADD_TODO:
			return [
				...state,
				{
					text: action.text,
					completed: false
				}
			];
		case TOGGLE_TODO:
			return state.map((todo, index) => {
				if (index === action.index) {
					return {
						...todo,
						completed: !todo.completed
					};
				}
				return todo;
			});
		default:
			return state;
	}
}

function visibilityFilterReducer(
	state: EVisibilityFilters = EVisibilityFilters.SHOW_ALL,
	action: todoActionTypes
) {
	switch (action.type) {
		case SET_VISIBILITY_FILTER:
			return action.filter;
		default:
			return state;
	}
}

export const todoAppReducer = combineReducers({
	visibilityFilter: visibilityFilterReducer,
	todos: todoReducer
});
