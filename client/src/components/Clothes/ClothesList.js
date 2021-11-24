import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router';

import { alpha } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';

import { getClothesList, deleteClothes } from '../../application/redux/actions';
import {
  clothesPaginationSelector,
  getClothesDetailSelector,
} from '../../application/redux/selectors';

import ClothesCreate from './ClothesCreate';
import ClothesEdit from './ClothesEdit';


function TableToolbar({ selectedList }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  async function handleDeleteItem() {
    await Promise.all([...selectedList.map((id) => dispatch(deleteClothes(id)))]);
    dispatch(getClothesList({ page: 0 }));
  }
  async function handleEdit() {
    navigate(`/clothes/${selectedList[0]}`);
  }

  function handleAdd() {
    navigate('/clothes/create');
  }

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
          <IconButton onClick={handleDeleteItem}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

function ClothesRowItem({ id, selected = false, onClick }) {
  const { data, error, loading } = useSelector(getClothesDetailSelector(id));
  return data ? (
    <TableRow
      key={id}
      hover
      role="checkbox"
      aria-checked={selected}
      selected={selected}
      tabIndex={-1}
      onClick={onClick}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell padding="checkbox">
        <Checkbox
          color="primary"
          checked={selected}
          inputProps={{
            'aria-labelledby': id,
          }}
        />
      </TableCell>
      <TableCell id={id} component="th" scope="row">
        {data.name}
      </TableCell>
      <TableCell align="right">{data.description}</TableCell>
      <TableCell align="right">{id}</TableCell>
    </TableRow>
  ) : null;
}

export default function ClothesList() {
  const { idList, page, count, total = 0, error, loading } = useSelector(clothesPaginationSelector);
  const dispatch = useDispatch();
  const [selectedState, setSelectedState] = useState({});
  // const [numSelected, setNumSelected] = useState(0);

  useEffect(() => {
    dispatch(getClothesList({ page: 0 }));
  }, [dispatch]);

  function handleChangePage(_, newPage) {
    dispatch(getClothesList({ page: newPage }));
  }

  function handleChangeCount(e) {
    const newCount = parseInt(e.target.value, 10);
    dispatch(getClothesList({ count: newCount }));
  }

  function handleSelectItem(id) {
    setSelectedState({
      ...selectedState,
      [id]: !selectedState[id],
    });
    // setNumSelected(numSelected + (selectedState[id] ? -1 : 1));
  }

  function handleSelectAll(e) {
    if (numSelected === count) {
      setSelectedState({});
      // setNumSelected(0);
    } else {
      setSelectedState(
        idList.reduce((result, id) => {
          result[id] = true;
          return result;
        }, {})
      );
      // setNumSelected(count);
    }
  }
  const selectedList = Object.entries(selectedState).reduce((result, [id, selected]) => {
    if (selected) result.push(id);
    return result;
  }, []);
  const numSelected = selectedList.length;
  return (
    <>
      <TableToolbar selectedList={selectedList} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  indeterminate={numSelected > 0 && numSelected < count}
                  checked={total > 0 && numSelected === count}
                  onChange={handleSelectAll}
                  inputProps={{
                    'aria-label': 'select all desserts',
                  }}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {idList.map((id) => (
              <ClothesRowItem
                id={id}
                selected={selectedState[id]}
                onClick={() => handleSelectItem(id)}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={total}
        rowsPerPage={count}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeCount}
      />

      <Routes>
        <Route path="/create" element={<ClothesCreate />} />
        <Route path="/:id" element={<ClothesEdit />} />
      </Routes>
    </>
  );
}
