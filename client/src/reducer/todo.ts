import { TodoStatus } from "@/const";

const initialState = {
  todos: [],
}


export const todos = (state = initialState, action: { type: TodoStatus, payload: {_id: string}}) => {
  switch (action.type) {
    case TodoStatus.CREATE_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          action.payload
        ]
      }

    case TodoStatus.SET_STATUS:
      return {
        ...state,
        todos: state.todos.map((todo: { _id: string }) => todo._id === action.payload._id ? action.payload : todo)
      }

    case TodoStatus.SET_TODOS:
      return {
        ...state,
        todos: action.payload
      }

    case TodoStatus.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo: { _id: string }) => todo._id !== action.payload._id)
      }
  
    default:
      return state
  }
}