import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

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
  const nextStatus = validNextStatus[basket?.status];
  const canChange =
    nextStatus === 'PENDING' ||
    nextStatus === 'WASHING_DONE' ||
    nextStatus === 'PENDING';
  const canClear = basket && basket.status === 'PENDING';
  const isEmpty = basket && basket.clothes && basket.clothes.length === 0;

  const [taskTime, setTaskTime] = useState();
  function handleTaskTimeChange(e) {
    setTaskTime(e.target.value);
  }

  function handleClose() {
    navigate(-1);
  }

  async function handleBasketOperation() {
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

  async function handleClearBasket() {
    if (canClear && !isEmpty) {
      await dispatch(updateBasketClothes(id, basket.clothes, true));
      await dispatch(fetchClothesLocations());
      handleClose();
    }
  }

  return (
    <DataModal open onClose={handleClose}>
      <>
        <p>Current Status: {basket.status}</p>
        <p>Next Status: {nextStatus}</p>

        <div>
          <label>Task Time</label>
          <input
            name="task-time"
            type="number"
            value={taskTime}
            onChange={handleTaskTimeChange}
          />
          {/* {error?.message && <div>{error.message}</div>} */}
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            handleBasketOperation();
          }}
        >
          ok
        </button>
      </>
      {!isEmpty &&
        (canClear ? (
          <>
            Remove all clothes from basket
            <button
              onClick={(e) => {
                e.preventDefault();
                handleClearBasket();
              }}
            >
              clear basket
            </button>
          </>
        ) : (
          <>Cannot clear basket while washing/drying</>
        ))}
    </DataModal>
  );
}
