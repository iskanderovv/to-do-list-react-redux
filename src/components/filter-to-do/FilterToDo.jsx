import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function FilterToDo({ filter, setFilter }) {
  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 150, mb: 2 }}>
      <FormControl fullWidth size="small">
        <InputLabel id="filter-select-small-label">Filter</InputLabel>
        <Select
          labelId="filter-select-small-label"
          id="filter-select-small"
          value={filter}
          label="Filter"
          onChange={handleChange}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
          <MenuItem value="uncompleted">Uncompleted</MenuItem>
          <MenuItem value="asc">A-Z</MenuItem>
          <MenuItem value="desc">Z-A</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
