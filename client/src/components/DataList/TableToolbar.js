import React from 'react';

import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

export default function TableToolbar({ selectedList, handleDelete, handleEdit, handleAdd }) {

  const numSelected = selectedList.length;
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Tooltip title="Add">
          <IconButton onClick={handleAdd}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      )}

      {numSelected === 1 && (
        <Tooltip title="Edit">
          <IconButton onClick={handleEdit}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      )}
      {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}
