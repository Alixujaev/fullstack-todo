import { useDispatch } from "react-redux";
import check from "../../public/Check.svg";
import trash from "../../public/Trash.svg";
import { completeTodo, deleteTodo } from "@/action/todo";

const TodoCard = ({
  _id,
  title,
  completed,
}: {
  _id: string;
  title: string;
  completed: boolean;
}) => {
  const dispatch = useDispatch();
  const handleDelete = (id: string) => {
    fetch(`https://fullstack-todo-6.onrender.com/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => {
        dispatch(deleteTodo({ _id: id }));
      })
      .catch((error) => {
        console.error("Error deleting todo:", error);
      });
  };

  const handleComplete = (id: string) => {
    fetch(`https://fullstack-todo-6.onrender.com/complete/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: !completed }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(completeTodo({ ...data }));
      })
      .catch((error) => {
        console.error("Error completing todo:", error);
      });
  };

  return (
    <div className="p-5 bg-[#15101C] rounded-xl flex justify-between items-center mb-3">
      <h3 className={`text-[#9E78CF] ${completed ? "line-through" : ""}`}>
        {title}
      </h3>
      <div className="flex items-center gap-3">
        <button onClick={() => handleComplete(_id)}>
          <img src={check} alt="check" />
        </button>
        <button onClick={() => handleDelete(_id)}>
          <img src={trash} alt="delete" />
        </button>
      </div>
    </div>
  );
};

export default TodoCard;
