import { CreateTodoPayload, TodoStatus } from "@/const"

export const createTodo = (item: CreateTodoPayload) => {
  return {
    type: TodoStatus.CREATE_TODO,
    payload: item
  }
}

export const setTodos = (todos: CreateTodoPayload[]) => {
  return {
    type: TodoStatus.SET_TODOS,
    payload: todos
  }
}

export const completeTodo = (todo: CreateTodoPayload) => {
  return {
    type: TodoStatus.SET_STATUS,
    payload: todo
  }
}


export const deleteTodo = (item: {_id: string}) => {
  return {
    type: TodoStatus.DELETE_TODO,
    payload: item
  }
}