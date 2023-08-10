import React, { useEffect, useState } from "react";
import "./App.css";
import TaskItem from "./components/TaskItem";
import { Task } from "./models/Task";
import InputField from "./components/InputField";
import { useDispatch, useSelector } from "react-redux";
import { filterTask } from "./store";

function App() {
  const tasks = useSelector((state: any) => state.tasks)

  const [todo, setTodo] = useState<string>("");
  const dispatch = useDispatch()

  const handleChange = (e: any) => {
    switch (e.target.value) {
      case 'active':
        dispatch(filterTask(false))
        break;
      
      case 'completed':
        dispatch(filterTask(true))
        break
      
      case 'all':
    
      default:
        break;
    }
  }

  return (
    <div className="min-h-screen bg-blue-500 p-10">
      <div className="flex flex-col gap-5">
        <p className="w-full text-center text-white font-bold text-3xl">
          Taskify
        </p>
        <div className="w-full">
          <InputField todo={todo} setTodo={setTodo} />
        </div>
        <div className="flex gap-5">
          <div className="w-1/2  mx-auto bg-cyan-400">
            <div className="flex gap-4 p-4">
              <p className="w-full text-2xl text-white">Tasks</p>
              <select name="" id="" onChange={handleChange}>
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="py-2 px-8 flex flex-col gap-2">
              {tasks.map((todo: Task) => (
                <TaskItem
                  key={todo.id}
                  id={todo.id}
                  description={todo.description}
                  isDone={todo.isDone}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
