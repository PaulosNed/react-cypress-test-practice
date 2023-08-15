import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import App from "../App";
import { deleteTask, moveTask } from "../store/slices/tasksSlice";

describe("App component", () => {
  const initialState = {
    tasks: {
      data: [
        {
          id: 1,
          description: "Test Task 1",
          isDone: false,
        },
        {
          id: 2,
          description: "Test Task 2",
          isDone: true,
        },
      ],
      search: "",
    },
  };

  const mockStore = configureStore([]);
  const store = mockStore(initialState);

  it("calls the removeTask function when delete button is clicked", () => {
    // to test whether click on delete button causes a dispatch to delete the task at hand.
    // This test starts with 2 tasks with id 1 and 2 respectively
    // in this test we are going to fetch the first task's (id == 1) delete button and we are going to make 
    // sure that a deleteTask action is dispatched with an id of 1
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  
    const deleteButton = screen.getAllByTestId("delete-button")[0];
    fireEvent.click(deleteButton);
    const actions = store.getActions();
    expect(actions).toContainEqual(deleteTask(1));
  });

  it("calls the completeTask function when complete button is clicked", () => {
    // To check whether editing the isDone field action is being dispatched successfully.
    // The test triggers the first complete button (id == 1).
    // the expected output is to dispatch a moveTask action with id == 1 and with isDone converted to true since it was false
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const completeButton = screen.getAllByTestId("complete-button")[0];
    fireEvent.click(completeButton);
    const actions = store.getActions();
    expect(actions).toContainEqual(moveTask({ id: 1, isDone: true }));
  });

  it("calls the completeTask function when rewind button is clicked", () => {
    // To check whether editing the isDone field action is being dispatched successfully.
    // The test triggers the second complete button (id == 2).
    // the expected output is to dispatch a moveTask action with id == 2 and with isDone converted to false since it was true
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const completeButton = screen.getAllByTestId("complete-button")[1];
    fireEvent.click(completeButton);
    const actions = store.getActions();
    expect(actions).toContainEqual(moveTask({ id: 2, isDone: false }));
  });
  
});
