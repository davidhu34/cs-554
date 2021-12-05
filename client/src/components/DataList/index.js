  import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';

import TableToolbar from './TableToolbar';
import DataCreate from './DataCreate';
import DataEdit from './DataEdit';

function DataRowItem({ id, selected = false, onClick, getDataSelector }) {
  const { data, error, loading } = useSelector(getDataSelector(id));
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

export default function DataList({
  path,
  paginationSelector,
  getDataSelector,
  fetchPaginationAction,
  deleteAction,
  updateAction,
  createAction,
  formConfigs,
}) {
  const { idList, page, count, total = 0, error, loading } = useSelector(paginationSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedState, setSelectedState] = useState({});

  useEffect(() => {
    dispatch(fetchPaginationAction({ page: 0 }));
  }, [dispatch, fetchPaginationAction]);

  function handleChangePage(_, newPage) {
    dispatch(fetchPaginationAction({ page: newPage }));
    setSelectedState({});
  }

  function handleChangeCount(e) {
    const newCount = parseInt(e.target.value, 10);
    dispatch(fetchPaginationAction({ count: newCount }));
  }

  function handleSelectItem(id) {
    setSelectedState({
      ...selectedState,
      [id]: !selectedState[id],
    });
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
    }
  }

  const selectedList = Object.entries(selectedState).reduce((result, [id, selected]) => {
    if (selected) result.push(id);
    return result;
  }, []);

  async function handleDelete() {
    await Promise.all([...selectedList.map((id) => dispatch(deleteAction(id)))]);
    setSelectedState({});
    dispatch(fetchPaginationAction({ page: 0 }));
  }

  function handleEdit() {
    navigate(`${path}/${selectedList[0]}/edit`);
  }

  function handleAdd() {
    navigate(`${path}/create`);
  }

  const numSelected = selectedList.length;
  return (
    <>
      <TableToolbar
        selectedList={selectedList}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleAdd={handleAdd}
      />
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
              <DataRowItem
                id={id}
                selected={selectedState[id]}
                onClick={() => handleSelectItem(id)}
                getDataSelector={getDataSelector}
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
        <Route
          path="/create"
          element={
            <DataCreate createAction={createAction} fetchPaginationAction={fetchPaginationAction} formConfigs={formConfigs}/>
          }
        />
        <Route
          path="/:id/edit"
          element={<DataEdit getDataSelector={getDataSelector} updateAction={updateAction}formConfigs={formConfigs} />}
        />
      </Routes>
    </>
  );
}
