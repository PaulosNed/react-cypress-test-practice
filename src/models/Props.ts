import { Task } from "./Task";

export interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  // setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}
