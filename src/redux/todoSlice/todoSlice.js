import { createSlice } from "@reduxjs/toolkit";

const loadTodosFromLocalStorage = () => {
  const todos = localStorage.getItem("todos");
  return todos ? JSON.parse(todos) : [];
};

const saveTodosToLocalStorage = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const initialState = {
  todos: loadTodosFromLocalStorage(),
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push({ ...action.payload, completed: false });
      saveTodosToLocalStorage(state.todos);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      saveTodosToLocalStorage(state.todos);
    },
    complatedTodo: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        saveTodosToLocalStorage(state.todos);
      }
    },
    editTodo: (state, action) => {
      const { id, newTodoName } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.name = newTodoName;
        saveTodosToLocalStorage(state.todos);
      }
    },
  },
});

export const { addTodo, removeTodo, complatedTodo, editTodo } = todoSlice.actions;
export const { reducer } = todoSlice;
