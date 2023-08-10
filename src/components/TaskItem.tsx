import React, { useState } from "react";
import { Task } from "../models/Task";
import { AiFillEdit, AiFillDelete, AiFillCheckCircle, AiFillBackward } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, moveTask } from "../store";

// interface AllTasks extends Task {
//   // tasks: Task[],
//   // setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
// }

const TaskItem: React.FC<Task> = ({ id, description, isDone}) => {
  const [edit, setEdit] = useState<boolean>(false)
  const [edited, setEdited] = useState<string>(description)
  const tasks = useSelector((state: any) => state.tasks)
  const dispatch = useDispatch()

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter" && edited) {
      // Call your function here, passing the inputValue if needed
      // For example, you can call a function named "handleEnterPressed"
      handleEnterPressed();
    }
  };

  const handleEnterPressed = () => {
    const updatedTasks = tasks.map((task: Task) => {
      if (id === task.id) {
        return {
          ...task,
          description: edited,
        };
      }
      return task;
    });
  
    // setTasks(updatedTasks);
    setEdit(false)
  }


  const removeTask = () => {
    dispatch(deleteTask(id))
  }

  const completeTask = () => {
    
    const payload = {
      id,
      isDone: !isDone
    }

    dispatch(moveTask(payload))
  };
  
  return (
    <div className="w-full bg-yellow-300 transform transition-all hover:outline-2 hover:outline-black duration-500 p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <div>
          {edit && <input type="text" value={edited} className="px-2 py-1" onChange={(e) => setEdited(e.target.value)} onKeyPress={handleKeyPress}/>}
          {!edit && <div className={`font-medium ${isDone ? 'line-through' : ''}`}>{description}</div>}
        </div>
        <div className="flex gap-2 items-center">
          <span onClick={() => setEdit((prev) => !prev)}>
            <AiFillEdit />
          </span>
          <span onClick={removeTask}>
            <AiFillDelete />
          </span>
          {!isDone && <span onClick={completeTask}>
            <AiFillCheckCircle />
          </span>}
          {isDone && <span onClick={completeTask}>
            <AiFillBackward />
          </span>}
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
