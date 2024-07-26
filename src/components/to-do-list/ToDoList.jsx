import { MdEditNote } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { BiEditAlt } from "react-icons/bi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { BiPlus } from "react-icons/bi";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Fab } from '@mui/material';
import { removeTodo, editTodo } from "../../redux/todoSlice/todoSlice";
import EditToDo from "../edit-to-do/EditToDo";

const ToDoList = () => {
  const dispatch = useDispatch();
  const { todos } = useSelector((state) => state.todos);

  const getFormattedDate = (timestamp) => {
    const date = new Date(timestamp);

    const pad = (num) => num.toString().padStart(2, '0');

    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1);
    const year = date.getFullYear();

    return `${hours}:${minutes}:${seconds} ${month}/${day}/${year}`;
  };

  const handleEditSave = (id, newTodoName) => {
    dispatch(editTodo({ id, newTodoName }));
  };

  return (
    <div className='w-full max-h-[400px] overflow-y-auto py-1 px-1'>
      <Box sx={{ width: '100%' }}>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          {todos.map((todo) => (
            <div className="shadow-itemSh w-full rounded-lg flex justify-between items-center px-3 py-[5px]"
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
              key={todo.id}
            >
              <span>{todo.name}</span>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
              >
                <span>{getFormattedDate(todo.id)}</span>
                <EditToDo todoName={todo.name} onSave={(newName) => handleEditSave(todo.id, newName)}>
                  <Fab
                    size="small"
                    color="secondary"
                    aria-label="edit"
                  >
                    <BiEditAlt className="text-xl" />
                  </Fab>
                </EditToDo>
                <Fab
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
