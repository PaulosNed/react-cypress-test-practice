import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux"; // You might need to adjust this import based on your actual setup
import App from "./App";
import configureMockStore from "redux-mock-store";
import userEvent from "@testing-library/user-event";
import { changeSearchTerm } from "./store/slices/tasksSlice";

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
    // a simple test to check whether the Title of the page.
    // the steps are to first fetch the header by text
    // and then check if it matches the word ("Taskify")
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
    // To check if the tasks list  state is properly being fetched and rendered.
    // steps
    // 1. fetch the container div for all task items with the test id of "task-list"
    // 2. check if tasklist is in the document
    // Expected output: task list should be found in the document

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
    // to check whether all the tasks are being fetched and loaded from the redux state
    // steps
    // 1. fetch all task items by their role (all of the have a role of "task-item")
    // 2. check if their length is equal to the state in the redux
    // Expected value: the length is expected to be equal with the length of the initial state == 2
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
    // to check whether all active tasks are being fetched and filterd in our components
    // steps
    // 1. use the searchTerm 'active' in initialState
    // 1. fetch all task items by their role (all of the have a role of "task-item")
    // 2. check if their length is equal to the length of the active tasks
    // Expected value: the length is expected to be equal with the length of the active tasks == 2
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

  it('dispatches the changeSearchTerm action when dropdown value changes', async () => {
    // to check whether changeSearchTerm action is being properly dispatched when the dropdown value changes
    // steps
    // 1. find the dropdown item by using its role 'combobox'
    // 1. use userEvent to initiate change in the dropdown value
    // 2. get the current dispatch actions and check if the changeSearchTerm action is being dispatched
    // Expected value: the action is expected to be dispatched
    const store = mockStore({
      tasks: {
        data: [],
        search: '',
      },
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const dropdown = screen.getByRole('combobox');
    const action = store.getActions()
    userEvent.selectOptions(dropdown, 'active');

    // Check if the expected action was dispatched
    expect(action).toContainEqual(changeSearchTerm('active'));

    userEvent.selectOptions(dropdown, 'completed');

    // Check if the expected action was dispatched
    expect(action).toContainEqual(changeSearchTerm('completed'));
  });

  it("filters the application based on the search term when search term is completed tasks", async () => {
    // to check whether all completed tasks are being fetched and filterd in our components
    // steps
    // 1. use the searchTerm 'completed' in initialState
    // 1. fetch all task items by their role (all of the have a role of "task-item")
    // 2. check if their length is equal to the length of the completed tasks
    // Expected value: the length is expected to be equal with the length of the completed tasks == 1
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
