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
  filter: "",
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
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const selectFilteredTodos = (state) => {
  const { todos, filter } = state.todos;

  let filteredTodos = [...todos];

  if (filter === "completed") {
    filteredTodos = todos.filter((todo) => todo.completed);
  } else if (filter === "uncompleted") {
    filteredTodos = todos.filter((todo) => !todo.completed);
  } else if (filter === "asc") {
    filteredTodos = filteredTodos.sort((a, b) => a.name.localeCompare(b.name));
  } else if (filter === "desc") {
    filteredTodos = filteredTodos.sort((a, b) => b.name.localeCompare(a.name));
  }

  return filteredTodos;
};

export const { addTodo, removeTodo, complatedTodo, editTodo, setFilter } =
  todoSlice.actions;
export const { reducer } = todoSlice;
