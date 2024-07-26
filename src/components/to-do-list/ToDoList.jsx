import { useDispatch, useSelector } from 'react-redux';
import { BiCheck, BiEditAlt } from "react-icons/bi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Fab } from '@mui/material';
import { removeTodo, editTodo, complatedTodo, setFilter, selectFilteredTodos } from "../../redux/todoSlice/todoSlice";
import EditToDo from "../edit-to-do/EditToDo";
import FilterToDo from '../filter-to-do/FilterToDo';

const ToDoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector(selectFilteredTodos);
  const filter = useSelector((state) => state.todos.filter);

  const getFormattedDate = (timestamp) => {
    const date = new Date(timestamp);
    const pad = (num) => num.toString().padStart(2, '0');

    return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())} ${pad(date.getMonth() + 1)}/${pad(date.getDate())}/${date.getFullYear()}`;
  };

  const handleEditSave = (id, newTodoName) => {
    dispatch(editTodo({ id, newTodoName }));
  };

  return (
    <div className='w-full max-h-[400px] overflow-y-auto py-1 px-1'>
      <FilterToDo filter={filter} setFilter={(value) => dispatch(setFilter(value))} />
      <Box sx={{ width: '100%' }}>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          {todos.map((todo) => (
            <div
              className={`shadow-itemSh w-full rounded-lg flex justify-between items-center px-3 py-[5px] ${todo.completed ? 'opacity-50' : ''}`}
              key={todo.id}
            >
              <span>{todo.name}</span>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
              >
                <span>{getFormattedDate(todo.id)}</span>
                <Fab
                  onClick={() => dispatch(complatedTodo(todo.id))}
                  size="small"
                  color={todo.completed ? "default" : "success"}
                  aria-label="complete"
                >
                  <BiCheck className="text-2xl" />
                </Fab>
                <EditToDo todoName={todo.name} onSave={(newName) => handleEditSave(todo.id, newName)}>
                  <Fab
                    disabled={todo.completed}
                    size="small"
                    color="secondary"
                    aria-label="edit"
                  >
                    <BiEditAlt className="text-xl" />
                  </Fab>
                </EditToDo>
                <Fab
                  disabled={todo.completed}
                  onClick={() => dispatch(removeTodo(todo.id))}
                  size="small"
                  color="error"
                  aria-label="delete"
                >
                  <MdOutlineDeleteOutline className="text-2xl" />
                </Fab>
              </Stack>
            </div>
          ))}
        </Stack>
      </Box>
    </div>
  );
};

export default ToDoList;
