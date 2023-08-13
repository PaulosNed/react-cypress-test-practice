import { createSlice } from "@reduxjs/toolkit";
import { Task } from "../../models/Task";

export const tasksSlice = createSlice({
  name: "task",
  initialState: {
    search: "",
    data: [
      {
        id: 1,
        description: "asdsadas",
        isDone: false,
      },
      {
        id: 2,
        description: "asdsadfgsdlkfnsdknfas",
        isDone: false,
      },
      {
        id: 3,
        description: "pppk;okolkdjgfjdhjg",
        isDone: true,
      },
    ],
  },
  reducers: {
    addTask(state, action) {
      state.data.push(action.payload);
    },
    deleteTask(state, action) {
      const updated = state.data.filter(
        (task: Task) => task.id !== action.payload
      );
      state.data = updated;
      return state;
    },
    moveTask(state, action) {
      state.data.forEach((task: Task) => {
        if (task.id === action.payload.id) {
          task.isDone = action.payload.isDone;
        }
      });
    },
    changeSearchTerm(state, action) {
      state.search = action.payload
    }
  },
});

export const { addTask, deleteTask, moveTask, changeSearchTerm } = tasksSlice.actions;
