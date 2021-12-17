import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { updateBasketClothes } from '../../application/redux/actions/basket';
import { fetchClothesLocations } from '../../application/redux/actions/clothesLocation';
import { getBasketDetailSelector } from '../../application/redux/selectors';
import { updateBasketStatus } from '../../application/redux/actions';

import DataModal from '../DataPage/DataModal';

const validNextStatus = {
  PENDING: 'WASHING',
  WASHING: 'WASHING_DONE',
  WASHING_DONE: 'DRYING',
  DRYING: 'DRYING_DONE',
  DRYING_DONE: 'PENDING',
};

export default function BasketOperation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    data: basket,
    loading,
    error,
  } = useSelector(getBasketDetailSelector(id));
  const { name = '', status = '' } = basket || {};
  const nextStatus = validNextStatus[status];
  const canOperate = status === 'PENDING' || status === 'WASHING_DONE';
  const canReset = status === 'DRYING_DONE';
  const isEmpty = basket && basket.clothes && basket.clothes.length === 0;
  const canClear = status === 'PENDING' && !isEmpty;

  const [taskTime, setTaskTime] = useState();
  const [taskTimeError, setTaskTimeError] = useState();
  function handleTaskTimeChange(e) {
    setTaskTimeError('');
    setTaskTime(e.target.value);
  }

  function handleClose() {
    navigate(-1);
  }

  function validateTaskTime() {
    if (taskTime && Number.isNumber(taskTime)) {
      return true;
    } else {
      setTaskTimeError('Task duration is required for this operation');
      return false;
    }
  }

  async function handleBasketOperation() {
    if ((canOperate && validateTaskTime()) || canReset) {
      await dispatch(
        updateBasketStatus(id, {
          status: nextStatus,
          time: taskTime,
          lastUpdateId: basket.history[basket.history.length - 1]._id,
        })
      );
      await dispatch(fetchClothesLocations());
      handleClose();
    }
  }

  async function handleClearBasket() {
    if (canClear) {
      await dispatch(updateBasketClothes(id, basket.clothes, true));
      await dispatch(fetchClothesLocations());
      handleClose();
    }
  }

  return (
    <DataModal open title={`${name} (${status})`} onClose={handleClose}>
      {(status === 'PENDING' || status === 'WASHING_DONE') && (
        <Box>
          <div>
            {status === 'PENDING' && (
              <Typography>Washing Task Ready</Typography>
            )}
            {status === 'WASHING_DONE' && (
              <Typography>Drying Task Ready</Typography>
            )}
          </div>
          <Box
            sx={{
              marginTop: 2,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <TextField
                m={4}
                error={!!taskTimeError}
                helperText={taskTimeError}
                label="Duration"
                id="basket-operation-duration-input"
                name="task-time"
                type="number"
                value={taskTime}
                onChange={handleTaskTimeChange}
              />
            </Box>
            <Box>
              <Button
                variant="contained"
                onClick={(e) => {
                  e.preventDefault();
                  handleBasketOperation();
                }}
              >
                Start{' '}
                {status === 'PENDING'
                  ? 'Washing'
                  : status === 'WASHING_DONE'
                  ? 'Drying'
                  : ''}
              </Button>
            </Box>
          </Box>
        </Box>
      )}
      {canReset && (
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Box>
            <Typography>Remove of all clothes and set to pending</Typography>
          </Box>
          <Box>
            <Button
              variant="contained"
              onClick={(e) => {
                e.preventDefault();
                handleBasketOperation();
              }}
            >
              Reset Basket
            </Button>
          </Box>
        </Box>
      )}

      {canClear && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Typography>Remove all clothes from basket</Typography>
          </Box>
          <Box>
            <Button
              variant="contained"
              onClick={(e) => {
                e.preventDefault();
                handleClearBasket();
              }}
            >
              Clear Basket
            </Button>
          </Box>
        </Box>
      )}
    </DataModal>
  );
}
