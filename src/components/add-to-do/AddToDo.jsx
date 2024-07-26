import { Button, TextField } from '@mui/material';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../../redux/todoSlice/todoSlice';

const AddToDo = () => {
  const dispatch = useDispatch();
  const toDoValue = useRef(null);

  const handleSubmit = (e) => {
    
    e.preventDefault();
    const trimmedValue = toDoValue.current.value.trim();
    if (trimmedValue !== '') {
      dispatch(addTodo({ id: Date.now(), name: trimmedValue }));
      toDoValue.current.value = '';
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex gap-4 w-full my-8 px-1'>
      <TextField
        inputRef={toDoValue}
        className='w-full'
        id="outlined-basic"
        label="Create To Do"
        variant="outlined"
        size='small'
        required
      />
      <Button type='submit' className='text-nowrap' variant="contained">Add To Do</Button>
    </form>
  );
};

export default AddToDo;
