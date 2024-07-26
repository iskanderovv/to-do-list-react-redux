import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useState } from 'react';

export default function EditToDo({ todoName, children, onSave }) {
  const [open, setOpen] = useState(false);
  const [newTodoName, setNewTodoName] = useState(todoName);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = (event) => {
    event.preventDefault();
    onSave(newTodoName);
    handleClose();
  };

  return (
    <>
      <span onClick={handleClickOpen}>
        {children}
      </span>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          '& .MuiTextField-root': { m: 1, width: '50ch' },
        }}
        PaperProps={{
          component: 'form',
          onSubmit: handleSave,
        }}
      >
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="todo"
            name="todo"
            label="Edit To Do"
            type="text"
            fullWidth
            variant="outlined"
            value={newTodoName}
            onChange={(e) => setNewTodoName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
