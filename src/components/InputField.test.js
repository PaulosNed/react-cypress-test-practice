import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import App from "../App";
import { addTask } from "../store/slices/tasksSlice";

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

  it("dispatches addTask action when 'Go' button is clicked with text", () => {
    // to test whether addTask action is properly being dispatched from our InputField component when the go 
    // button is clicked with some text on the input field. the expected outcome is the dispatch of the addTask 
    // action with a payload of a new Task object.

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  
    const inputElement = screen.getByPlaceholderText("Enter a task");
    const addButton = screen.getByText("Go");

    fireEvent.change(inputElement, { target: { value: "New Task" } });
    fireEvent.click(addButton);

    const actions = store.getActions();
    expect(actions).toContainEqual(addTask({
        id: expect.any(Number),
        description: "New Task",
        isDone: false,
      }));
  });

  it("does not dispatch addTask action when 'Go' button is clicked with empty text", () => {
    // to test what happens if the input field was null and the GO button was clicked. the expected outcome is 
    // that nothing should happen and no action should be dispatched

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const addButton = screen.getByText("Go");

    const prevActions = store.getActions()

    fireEvent.click(addButton);

    const actions = store.getActions();
    expect(actions).toEqual(prevActions);
  });
  
  // Similar test for the backward button
});
