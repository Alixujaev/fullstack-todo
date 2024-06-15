import { useDispatch, useSelector } from "react-redux";
import TodoCard from "./components/TodoCard";
import TodoForm from "./components/TodoForm";
import { useEffect } from "react";
import { setTodos } from "./action/todo";

function App() {
  const { todos } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://fullstack-todo-beta-p2cdaf5o6-islomali3110gmailcoms-projects.vercel.app/todos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(setTodos(data));
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
      });
  }, []);

  return (
    <div className="max-w-[430px] mx-auto pt-28">
      <TodoForm />

      <h2 className="text-white mb-4">Tasks to do - {todos.length}</h2>

      {todos.length ? (
        <div className="mb-6">
          {todos.map(
            (todo: { _id: string; title: string; completed: boolean }) => (
              <TodoCard key={todo._id} {...todo} />
            )
          )}
        </div>
      ) : (
        <div className="h-36 flex justify-center items-center mb-4">
          <p className="text-white">No tasks to do</p>
        </div>
      )}
    </div>
  );
}

export default App;
