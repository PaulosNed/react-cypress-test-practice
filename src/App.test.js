import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux"; // You might need to adjust this import based on your actual setup
import App from "./App";
import configureMockStore from "redux-mock-store";

// Create a mock store
const mockStore = configureMockStore();

const initialState = {
  tasks: {
    data: [
      { id: 1, description: "Task 1", isDone: false },
      { id: 2, description: "Task 2", isDone: false },
      { id: 3, description: "Task 3", isDone: true },
    ],
    search: "",
  },
};
const store = mockStore(initialState);


describe("App Component", () => {
  it("renders the application with header named taskify", () => {
    render(
      <Provider
        store={store}
      >
        <App />
      </Provider>
    );

    const headerText = screen.getByText("Taskify");
    expect(headerText).toBeInTheDocument();
  });

  it("renders the application with task list", () => {
    render(
      <Provider
        store={mockStore({
          tasks: {
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
            ],
            search: "",
          },
        })}
      >
        <App />
      </Provider>
    );

    const taskList = screen.getByTestId("task-list");
    expect(taskList).toBeInTheDocument();
  });

  it("renders the application with correct number of task items", async () => {
    
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const taskItems = await screen.findAllByRole("task-item");
    const tasksLength = initialState.tasks.data.length;

    expect(taskItems).toHaveLength(tasksLength);
  });

  it("filters the application based on the search term when search term is active tasks", async () => {
    const is = {
      tasks: {
        data: [
          { id: 1, description: "Task 1", isDone: false },
          { id: 2, description: "Task 2", isDone: false },
          { id: 3, description: "Task 3", isDone: true },
        ],
        search: "active",
      },
    };

    render(
      <Provider store={mockStore(is)}>
        <App />
      </Provider>
    );

    const taskItems = await screen.findAllByRole("task-item");
    
    expect(taskItems).toHaveLength(2);
  });

  it("filters the application based on the search term when search term is completed tasks", async () => {
    const is = {
      tasks: {
        data: [
          { id: 1, description: "Task 1", isDone: false },
          { id: 2, description: "Task 2", isDone: false },
          { id: 3, description: "Task 3", isDone: true },
        ],
        search: "completed",
      },
    };

    render(
      <Provider store={mockStore(is)}>
        <App />
      </Provider>
    );

    const taskItems = await screen.findAllByRole("task-item");
    
    expect(taskItems).toHaveLength(1);
  });
  // Add more test cases as needed
});
