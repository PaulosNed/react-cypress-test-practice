import React from "react";
import { Props } from "../models/Props";
import { Task } from "../models/Task";
import { useDispatch } from "react-redux";
import { addTask } from "../store/slices/tasksSlice";

const InputField: React.FC<Props> = ({ todo, setTodo }) => {

  const dispatch = useDispatch()
  
    const handleAdd = () => {
        if (todo) {
            const newTodo: Task = {
                id: Date.now(),
                description: todo,
                isDone: false
            };

            dispatch(addTask(newTodo))
    
            setTodo('')
        }
    }
  
    return (

      // Input section
    <div className="w-full bg-white p-1 rounded-full">
      <div className="w-full flex rounded-full pl-4">
        <input
          type="text"
          className="flex-auto text-lg focus:outline-none"
          placeholder="Enter a task"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />

        {/* submit button */}
        <button onClick={handleAdd} className="w-12 h-12 rounded-full bg-blue-500 text-lg text-white shadow-xl">
          Go
        </button>
      </div>
    </div>
  );
};

export default InputField;
