export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';

export enum VisibilityFilters {
  SHOW_ALL= 'SHOW_ALL',
  SHOW_COMPLETED= 'SHOW_COMPLETED',
  SHOW_ACTIVE= 'SHOW_ACTIVE',
}

export function addTodo(text: string){
  return {
    type: ADD_TODO,
    text
  }
}

export function toggleTodo(index: number){
  return {
    type: TOGGLE_TODO,
    index
  }
}

export function setVisibilityFilter(filter: VisibilityFilters){
  return {
    type: VisibilityFilters,
    filter
  }
}