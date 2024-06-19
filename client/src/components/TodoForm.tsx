import { FormEvent, useRef } from "react";
import plus from "../../public/Plus.svg";
import { useDispatch } from "react-redux";
import { createTodo } from "@/action/todo";

const TodoForm = () => {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (inputRef.current) {
      fetch(`https://fullstack-todo-6.onrender.com/todo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: inputRef.current.value,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch(createTodo(data));
        });
    }

    if (formRef.current) {
      formRef.current.reset();
    }
  }

  return (
    <form
      ref={formRef}
      className="flex gap-3 mb-14"
      onSubmit={(e) => handleSubmit(e)}
    >
      <input
        type="text"
        placeholder="Add a new task"
        className="px-4 py-2 bg-transparent rounded-xl outline-none border border-[#3E1671] flex-1 text-white"
        ref={inputRef}
      />
      <button
        type="submit"
        className="w-10 h-10 rounded-xl bg-[#9E78CF] flex justify-center items-center"
      >
        <img src={plus} alt="" />
      </button>
    </form>
  );
};

export default TodoForm;
