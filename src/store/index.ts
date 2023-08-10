import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Task } from "../models/Task";


const tasksSlice = createSlice({
    name: "task",
    initialState: [
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
    reducers: {
        addTask(state, action) {
            state.push(action.payload)
        },
        deleteTask(state, action) {
            state = state.filter((task: Task) => task.id !== action.payload)
            return state
        },
        moveTask(state, action) {
          state.forEach((task: Task) => {
            if (task.id === action.payload.id) {
              task.isDone = action.payload.isDone
            }
          })
        },
        filterTask(state, action) {
          state = state.filter((task: Task) => task.isDone === action.payload)
          return state
        }
    }
})


export const store = configureStore({
    reducer: {
        tasks: tasksSlice.reducer
    }
})

export const {addTask, deleteTask, moveTask, filterTask} = tasksSlice.actions