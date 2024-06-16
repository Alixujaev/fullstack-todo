export enum TodoStatus {
  CREATE_TODO = "CREATE_TODO",
  UPDATE_TODO = "UPDATE_TODO",
  DELETE_TODO = "DELETE_TODO",
  SET_TODO = "SET_TODO",
  SET_TODOS = "SET_TODOS",
  SET_STATUS = "SET_STATUS",
  SET_ERROR = "SET_ERROR",
  SET_COMPLETED = "SET_COMPLETED"
}

export type CreateTodoPayload = {
  title: string;
  id: string;
  completed: boolean;
}


export type Todo = {
  title: string;
  _id: string;
  completed: boolean;
}
